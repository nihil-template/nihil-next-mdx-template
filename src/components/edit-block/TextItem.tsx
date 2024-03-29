'use client';

import React, {
  useCallback, useMemo
} from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { useQueryClient } from '@tanstack/react-query';
import { Post } from '@prisma/client';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form/dist/useForm';
import { SubmitHandler } from 'react-hook-form/dist/types';
import { BlockItem, TextBlockItem } from '@/src/entities';
import {
  ApiResponse, Nihil, useUpdatePost
} from '@/src/common';
import { ItemBottomButtons, ItemManageMenu } from '@/src/components';
import {
  Form, FormField, FormItem, FormLabel, Textarea
} from '@/src/shadcn';

interface Props {
  block: TextBlockItem;
  content: BlockItem[];
  styles?: ClassNameValue;
}

interface Inputs {
  text: string;
}

export function TextItem({ block, content, styles, }: Props) {
  const model = object({
    text: string().required(),
  });

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(model),
    defaultValues: {
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
    },
    [ originBlock, ]
  );

  const resetBlock = useCallback(
    () => {
      form.setValue('text', '');
    },
    []
  );

  const saveBlock: SubmitHandler<Inputs> = useCallback(
    (data) => {
      const findBlock = content.find(
        (item) => item.id === block.id
      ) as TextBlockItem;

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
                  <FormLabel>문단 내용</FormLabel>
                  <Textarea
                    value={field.value}
                    autoComplete='off'
                    onChange={field.onChange}
                  />
                </FormItem>
              )}
              name='text'
            />
          </form>
        </Form>

        <ItemBottomButtons
          restoreBlock={restoreBlock}
          resetBlock={resetBlock}
        />
      </div>
    </>
  );
}
