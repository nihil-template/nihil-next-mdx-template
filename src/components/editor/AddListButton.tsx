'use client';

import React, { useCallback } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { Post } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';
import { Icon } from '@iconify/react';
import { BlockItem, ListBlockItem } from '@/src/entities';
import { ApiResponse, Nihil, useUpdatePost } from '@/src/common';
import { Button } from '@/src/shadcn';

interface Props {
  post: Post;
  type: ('ORDERED' | 'UNORDERED');
  content: BlockItem[];
  styles?: ClassNameValue;
}

export function AddListButton({
  post, type, content, styles,
}: Props) {
  const qc = useQueryClient();

  const updatePost = useUpdatePost(post.id);

  const onClickAddList = useCallback(
    () => {
      const copyPost = { ...post, };

      content.push({
        id: Nihil.uuid(),
        postId: post.id,
        name: 'LIST',
        type,
        items: [],
      } as ListBlockItem);

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
        aria-label={`add ${type.toLowerCase()} list`}
        className={css.default}
        onClick={onClickAddList}
      >

        {type === 'ORDERED' ? (
          <Icon icon='mdi:format-list-numbered' />
        ) : (
          <Icon icon='mdi:format-list-bulleted' />
        )}
      </Button>
    </>
  );
}
