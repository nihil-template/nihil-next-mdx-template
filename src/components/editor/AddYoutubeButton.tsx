'use client';

import React, { useCallback } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { Post } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';
import { Icon } from '@iconify/react';
import { BlockItem, YoutubeBlockItem } from '@/src/entities';
import { ApiResponse, Nihil, useUpdatePost } from '@/src/common';
import { Button } from '@/src/shadcn';

interface Props {
  post: Post;
  content: BlockItem[];
  styles?: ClassNameValue;
}

export function AddYoutubeButton({ post, content, styles, }: Props) {
  const qc = useQueryClient();

  const updatePost = useUpdatePost(post.id);

  const onClickAddYoutube = useCallback(
    () => {
      const copyPost = { ...post, };

      content.push({
        id: Nihil.uuid(),
        postId: post.id,
        name: 'YOUTUBE',
        videoId: '',
        text: '',
      } as YoutubeBlockItem);

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
        aria-label='add youtube video'
        className={css.default}
        onClick={onClickAddYoutube}
      >
        <Icon icon='mdi:youtube' />
      </Button>
    </>
  );
}
