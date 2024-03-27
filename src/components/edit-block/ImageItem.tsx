'use client';

import React, { useCallback, useMemo } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { useForm } from 'react-hook-form/dist/useForm';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler } from 'react-hook-form/dist/types';
import { useQueryClient } from '@tanstack/react-query';
import { Post } from '@prisma/client';
import { BlockItem, ImageBlockItem } from '@/src/entities';
import { ApiResponse, Nihil, useUpdatePost } from '@/src/common';
import { ItemBottomButtons, ItemManageMenu } from '@/src/components';
import {
  Form, FormField, FormItem, FormLabel, Input
} from '@/src/shadcn';

interface Props {
  block: ImageBlockItem;
  content: BlockItem[];
  styles?: ClassNameValue;
}

interface Inputs {
  link: string;
  alt: string;
}

export function ImageItem({ block, content, styles, }: Props) {
  const model = object({
    link: string().required(),
    alt: string().required(),
  });

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(model),
    defaultValues: {
      link: block.link,
      alt: block.alt,
    },
  });

  const originBlock = useMemo(() => {
    return block;
  }, []);

  const qc = useQueryClient();

  const updatePost = useUpdatePost(block.postId);

  const restoreBlock = useCallback(
    () => {
      form.setValue('link', originBlock.link);
      form.setValue('alt', originBlock.alt);
    },
    [ originBlock, ]
  );

  const resetBlock = useCallback(
    () => {
      form.setValue('link', '');
      form.setValue('alt', '');
    },
    []
  );

  const saveBlock: SubmitHandler<Inputs> = useCallback(
    (data) => {
      const findBlock = content.find(
        (item) => item.id === block.id
      ) as ImageBlockItem;

      findBlock.link = data.link;
      findBlock.alt = data.alt;

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
    []
  );

  const css = {
    default: twJoin([
      ``,
      styles,
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
              render={({ field, }) => (
                <FormItem>
                  <FormLabel />
                  <Input type='text' value={field.value} onChange={field.onChange} />
                </FormItem>
              )}
              name='link'
            />
            <FormField
              control={form.control}
              render={({ field, }) => (
                <FormItem>
                  <FormLabel />
                  <Input type='text' value={field.value} onChange={field.onChange} />
                </FormItem>
              )}
              name='alt'
            />
          </form>

          <ItemBottomButtons
            restoreBlock={restoreBlock}
            resetBlock={resetBlock}
          />
        </Form>
      </div>
    </>
  );
}
