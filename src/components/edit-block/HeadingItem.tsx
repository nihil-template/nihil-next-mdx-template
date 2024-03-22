'use client';

import React, {
  ChangeEvent, useCallback, useMemo, useState
} from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { useQueryClient } from '@tanstack/react-query';
import { Post } from '@prisma/client';
import { object, string } from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { BlockItem, HeadingBlockItem } from '@/src/entities';
import {
  ApiResponse, Nihil, useInput, useUpdatePost
} from '@/src/common';
import { ItemManageMenu } from '@/src/components';
import {
  Button,
  Form, FormField, FormItem, FormLabel, Input,
  Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue
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
  });

  const originBlock = useMemo(() => {
    return block;
  }, []);

  const level = useInput<HTMLSelectElement>({
    id: 'level',
    initValue: block.level,
  });

  const text = useInput<HTMLTextAreaElement>({
    id: 'text',
    initValue: block.text,
  });

  const qc = useQueryClient();

  const updatePost = useUpdatePost(block.postId);

  const restoreBlock = useCallback(
    () => {
      text.setState(originBlock.text);
      level.setState(originBlock.level);
    },
    []
  );

  const resetBlock = useCallback(
    () => {
      text.setState('');
      level.setState('h2');
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
    [ block, text, level, ]
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
            <div>
              <button onClick={restoreBlock}>되돌리기</button>
              <Button size='sm' type='submit'>저장</Button>
              <button onClick={resetBlock}>비우기</button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
