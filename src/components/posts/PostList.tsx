'use client';

import React, { useCallback, useState } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { object, string } from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import {
  Board, BoardHeader, BoardList,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Message
} from '@/src/shadcn';
import {
  keysData, Nihil, useCreatePost, useGetPosts
} from '@/src/common';

interface Props {
  styles?: ClassNameValue;
}

interface Inputs {
  title: string;
  description: string;
}

export function PostList({ styles, }: Props) {
  const [ open, setOpen, ] = useState(false);

  const createPostSchema = object({
    title: string().required('제목을 입력해야합니다.'),
    description: string().required('설명을 입력해야합니다.'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, },
    // watch,
    reset,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(createPostSchema),
  });

  const {
    data: posts,
    isLoading,
    isFetching,
    // isError,
    // error,
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

          reset({
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
      <button onClick={() => toast.info('test')}>테스트</button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size='sm' className='bg-blue-500 hover:bg-blue-600'>글 작성하기</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>게시글 작성</DialogTitle>
            <DialogDescription>작성할 글의 정보를 입력해주세요.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onCreatePost)}>
            <div className='mb-2'>
              <Label htmlFor='title'>제목</Label>
              <Input
                id='title'
                type='text'
                placeholder='제목을 입력해주세요.'
                {...register('title')}
              />
              {errors.title && (
                <Message color='red'>{errors.title.message}</Message>
              )}
            </div>
            <div className='mb-2'>
              <Label htmlFor='description'>설명</Label>
              <Input
                id='description'
                type='text'
                placeholder='설명을 입력해주세요.'
                {...register('description')}
              />
              {errors.description && (
                <Message color='red'>{errors.description.message}</Message>
              )}
            </div>
            <div className='text-right'>
              <Button type='submit'>생성</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Board width='w-[900px]'>
        <BoardHeader />
        <BoardList data={posts.data} />
      </Board>
    </>
  );
}
