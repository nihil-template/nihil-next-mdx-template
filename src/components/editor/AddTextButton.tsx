'use client';

import React, { useCallback } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { Post } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';
import { Icon } from '@iconify/react';
import { Button } from '@/src/shadcn';
import { ApiResponse, Nihil, useUpdatePost } from '@/src/common';
import { BlockItem, TextBlockItem } from '@/src/entities';

interface Props {
  post: Post;
  content: BlockItem[];
  styles?: ClassNameValue;
}

export function AddTextButton({ post, content, styles, }: Props) {
  const qc = useQueryClient();

  const updatePost = useUpdatePost(post.id);

  const onClickAddText = useCallback(
    () => {
      const copyPost = { ...post, };
      content.push({
        id: Nihil.uuid(),
        postId: post.id,
        name: 'TEXT',
        text: '',
      } as TextBlockItem);

      copyPost.content = Nihil.string(content);

      updatePost.mutate({
        content: copyPost.content,
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
    [ post, content, qc, ]
  );

  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
  };

  return (
    <>
      <Button
        size='sm'
        aria-label='add text'
        className={css.default}
        onClick={onClickAddText}
      >
        <Icon icon='mdi:format-text' />
      </Button>
    </>
  );
}
