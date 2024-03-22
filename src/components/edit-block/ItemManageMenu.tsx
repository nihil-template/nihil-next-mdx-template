'use client';

import React, { useCallback } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { useQueryClient } from '@tanstack/react-query';
import { Post } from '@prisma/client';
import { Icon } from '@iconify/react';
import { BlockItem } from '@/src/entities';
import { ApiResponse, Nihil, useUpdatePost } from '@/src/common';
import { Button } from '@/src/shadcn';

interface Props {
  block: BlockItem;
  content: BlockItem[];
  styles?: ClassNameValue;
}

export function ItemManageMenu({ block, content, styles, }: Props) {
  const qc = useQueryClient();

  const updatePost = useUpdatePost(block.postId);

  const onClickMoveTop = useCallback(
    () => {

    },
    []
  );

  const onClickMoveDown = useCallback(
    () => {

    },
    []
  );

  const onClickRemove = useCallback(
    () => {
      const filteredContent = content.filter(
        (item) => item.id !== block.id
      );

      updatePost.mutate({
        content: Nihil.string(filteredContent),
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
    button: twJoin([
      ``,
    ]),
  };

  return (
    <>
      <div className={css.default}>
        <Button size='sm' onClick={onClickMoveTop}>
          <Icon icon='icon-park:to-top' />
        </Button>
        <Button size='sm' onClick={onClickMoveDown}>
          <Icon icon='icon-park:to-bottom' />
        </Button>
        <Button size='sm' onClick={onClickRemove}>
          <Icon icon='mdi:trashcan' />
        </Button>
      </div>
    </>
  );
}
