'use client';

import React, { useCallback } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { Post } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';
import { Icon } from '@iconify/react';
import { BlockItem, HeadingBlockItem } from '@/src/entities';
import { ApiResponse, Nihil, useUpdatePost } from '@/src/common';
import { Button } from '@/src/shadcn';

interface Props {
  post: Post;
  content: BlockItem[];
  styles?: ClassNameValue;
}

export function AddHeadingButton({ post, content, styles, }: Props) {
  const qc = useQueryClient();

  const updatePost = useUpdatePost(post.id);

  const onClickAddHeading = useCallback(
    () => {
      const copyPost = { ...post, };

      content.push({
        id: Nihil.uuid(),
        postId: post.id,
        name: 'HEADING',
        text: '',
        level: 'h2',
      } as HeadingBlockItem);

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
        aria-label='add heading'
        className={css.default}
        onClick={onClickAddHeading}
      >
        <Icon icon='gravity-ui:heading' />
      </Button>
    </>
  );
}
