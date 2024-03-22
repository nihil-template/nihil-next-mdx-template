'use client';

import React, { useCallback } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { Icon } from '@iconify/react';
import { Post } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/src/shadcn';
import { BlockItem, ImageBlockItem } from '@/src/entities';
import { ApiResponse, Nihil, useUpdatePost } from '@/src/common';

interface Props {
  post: Post;
  content: BlockItem[];
  styles?: ClassNameValue;
}

export function AddImageButton({ post, content, styles, }: Props) {
  const qc = useQueryClient();

  const updatePost = useUpdatePost(post.id);

  const onClickAddImage = useCallback(
    () => {
      const copyPost = { ...post, };

      content.push({
        id: Nihil.uuid(),
        postId: post.id,
        name: 'IMAGE',
        link: '',
        alt: '',
      } as ImageBlockItem);

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
        aria-label='add image'
        className={css.default}
        onClick={onClickAddImage}
      >
        <Icon icon='mdi:file-image' />
      </Button>
    </>
  );
}
