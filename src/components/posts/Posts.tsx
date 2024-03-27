'use client';

import React, { useCallback, useState } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { useQueryClient } from '@tanstack/react-query';
import { object, string } from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form, FormField, FormItem, FormLabel,
  Input,
  Message, Textarea
} from '@/src/shadcn';
import {
  keysData, Nihil, useCreatePost, useGetPosts
} from '@/src/common';
import { PostList } from '@/src/components';

interface Props {
  styles?: ClassNameValue;
}

interface Inputs {
  title: string;
  description: string;
}

export function Posts({ styles, }: Props) {
  const [ open, setOpen, ] = useState(false);

  const createPostSchema = object({
    title: string().required('제목을 입력해야합니다.'),
    description: string().required('설명을 입력해야합니다.'),
  });

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(createPostSchema),
  });

  const { formState: { errors, }, } = form;

  const {
    data: posts,
    isLoading,
    isFetching,
  } = useGetPosts();

  const {
    mutate,
  } = useCreatePost();

  const qc = useQueryClient();

  const onCreatePost: SubmitHandler<Inputs> = useCallback(
    (data) => {
      mutate({
        title: data.title,
        description: data.description,
        content: '[]',
      }, {
        onSuccess() {
          qc.invalidateQueries({
            queryKey: keysData.post.getAll,
          });

          form.reset({
            title: '',
            description: '',
          });

          Nihil.toast({
            text: '게시글이 생성됨.',
            type: 'success',
          });

          setOpen(false);
        },
      });
    },
    []
  );

  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
  };

  if (isLoading || isFetching) {
    return (
      <div>로딩중</div>
    );
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size='sm' className='bg-blue-500 hover:bg-blue-600'>글 작성하기</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>게시글 작성</DialogTitle>
            <DialogDescription>작성할 글의 정보를 입력해주세요.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onCreatePost)}>
              <FormField
                control={form.control}
                render={() => (
                  <FormItem>
                    <FormLabel htmlFor='title'>제목</FormLabel>
                    <Input
                      id='title'
                      type='text'
                      placeholder='제목을 입력해주세요.'
                      autoComplete='off'
                      {...form.register('title')}
                    />
                    {errors.title && (
                      <Message color='red'>{errors.title.message}</Message>
                    )}
                  </FormItem>
                )}
                name='title'
              />
              <FormField
                control={form.control}
                render={() => (
                  <FormItem>
                    <FormLabel htmlFor='description'>설명</FormLabel>
                    <Textarea
                      id='description'
                      placeholder='설명을 입력해주세요.'
                      autoComplete='off'
                      {...form.register('description')}
                    />
                    {errors.description && (
                      <Message color='red'>{errors.description.message}</Message>
                    )}
                  </FormItem>
                )}
                name='description'
              />
              <div className='text-right mt-2'>
                <Button type='submit'>생성</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <PostList posts={posts.data} />
    </>
  );
}
