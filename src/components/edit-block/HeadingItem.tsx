'use client';

import React, {
  useCallback, useMemo
} from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { useQueryClient } from '@tanstack/react-query';
import { Post } from '@prisma/client';
import { object, string } from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { BlockItem, HeadingBlockItem } from '@/src/entities';
import {
  ApiResponse, Nihil, useUpdatePost
} from '@/src/common';
import { ItemBottomButtons, ItemManageMenu } from '@/src/components';
import {
  Form, FormField, FormItem, FormLabel, Input,
  Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue
} from '@/src/shadcn';

interface Props {
  block: HeadingBlockItem;
  content: BlockItem[];
  styles?: ClassNameValue;
}

interface Inputs {
  level: string;
  text: string;
}

export function HeadingItem({ block, content, styles, }: Props) {
  const model = object({
    level: string().required(),
    text: string().required(),
  });

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(model),
    defaultValues: {
      level: block.level,
      text: block.text,
    },
  });

  const originBlock = useMemo(() => {
    return block;
  }, []);

  const qc = useQueryClient();

  const updatePost = useUpdatePost(block.postId);

  const restoreBlock = useCallback(
    () => {
      form.setValue('text', originBlock.text);
      form.setValue('level', originBlock.level);
    },
    [ originBlock, ]
  );

  const resetBlock = useCallback(
    () => {
      form.setValue('text', '');
      form.setValue('level', 'h2');
    },
    []
  );

  const saveBlock: SubmitHandler<Inputs> = useCallback(
    (data) => {
      const findBlock = content.find(
        (item) => item.id === block.id
      ) as HeadingBlockItem;

      findBlock.level = data.level as ('h2' | 'h3' | 'h4' | 'h5' | 'h6');
      findBlock.text = data.text;

      updatePost.mutate({
        content: Nihil.string(content),
      }, {
        onSuccess({ data: post, }) {
          qc.setQueryData(
            [ 'getPostById', post.id, ],
            (oldPost: ApiResponse<Post>) => (
              { ...oldPost, data: post, }
            )
          );
        },
      });
    },
    [ block, ]
  );

  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
    select: twJoin([
      ``,
    ]),
    text: twJoin([
      ``,
    ]),
  };

  return (
    <>
      <div className={css.default}>
        <div>
          menu
          <ItemManageMenu block={block} content={content} />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(saveBlock)}>
            <FormField
              control={form.control}
              name='level'
              render={({ field, }) => (
                <FormItem>
                  <FormLabel>단계</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder='제목의 단계를 선택하세요.' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value='h2'>H2</SelectItem>
                        <SelectItem value='h3'>H3</SelectItem>
                        <SelectItem value='h4'>H4</SelectItem>
                        <SelectItem value='h5'>H5</SelectItem>
                        <SelectItem value='h6'>H6</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='text'
              render={({ field, }) => (
                <FormItem>
                  <FormLabel>내용</FormLabel>
                  <Input
                    type='text'
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormItem>
              )}
            />

            <ItemBottomButtons
              restoreBlock={restoreBlock}
              resetBlock={resetBlock}
            />
          </form>
        </Form>
      </div>
    </>
  );
}
