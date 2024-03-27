'use client';

import React, { useCallback } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { useQueryClient } from '@tanstack/react-query';
import { Post } from '@prisma/client';
import { Icon } from '@iconify/react';
import { ApiResponse, Nihil, useUpdatePost } from '@/src/common';
import { BlockItem, MessageBlockItem } from '@/src/entities';
import { Button } from '@/src/shadcn';

interface Props {
  post: Post;
  content: BlockItem[];
  styles?: ClassNameValue;
}

export function AddMessageButton({ post, content, styles, }: Props) {
  const qc = useQueryClient();

  const updatePost = useUpdatePost(post.id);

  const onClickAddMessage = useCallback(
    () => {
      const copyPost = { ...post, };

      content.push({
        id: Nihil.uuid(),
        postId: post.id,
        name: 'MESSAGE',
        color: 'BLUE',
        text: '',
      } as MessageBlockItem);

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
        aria-label='add message'
        className={css.default}
        onClick={onClickAddMessage}
      >
        <Icon icon='ant-design:message-filled' />
      </Button>
    </>
  );
}
