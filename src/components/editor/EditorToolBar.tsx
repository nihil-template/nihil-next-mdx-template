'use client';

import React, { useCallback } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { Icon } from '@iconify/react';
import { Post } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';
import { TextBlockItem } from '@/src/entities';
import {
  ApiResponse, Nihil, useContent, useUpdatePost
} from '@/src/common';
import { Button } from '@/src/shadcn';

interface Props {
  post: Post;
  styles?: ClassNameValue;
}

export function EditorToolBar({ post, styles, }: Props) {
  console.log('post >> ', post);
  const content = useContent(post);

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
    [ post, content, qc, ]
  );

  const css = {
    default: twJoin([
      `p-2 rounded-2 bg-black-100`,
      styles,
    ]),
    button: twJoin([
      `bg-black-200 hover:bg-white text-black-base text-[18px]`,
    ]),
  };

  return (
    <>
      <div className={css.default}>
        <Button
          size='sm'
          aria-label='add heading'
          className={css.button}
        >
          <Icon icon='gravity-ui:heading' />
        </Button>
        <Button
          size='sm'
          aria-label='add text'
          className={css.button}
          onClick={onClickAddText}
        >
          <Icon icon='mdi:format-text' />
        </Button>
        <Button
          size='sm'
          aria-label='add image'
          className={css.button}
        >
          <Icon icon='mdi:file-image' />
        </Button>
        <Button
          size='sm'
          aria-label='add ordered list'
          className={css.button}
        >
          <Icon icon='mdi:format-list-bulleted' />
        </Button>
        <Button
          size='sm'
          aria-label='add unordered list'
          className={css.button}
        >
          <Icon icon='mdi:format-list-numbered' />
        </Button>
        <Button
          size='sm'
          aria-label='add message'
          className={css.button}
        >
          <Icon icon='ant-design:message-filled' />
        </Button>
        <Button
          size='sm'
          aria-label='add quote'
          className={css.button}
        >
          <Icon icon='mdi:format-quote-open' />
        </Button>
        <Button
          size='sm'
          aria-label='add codeblock'
          className={css.button}
        >
          <Icon icon='mdi:code' />
        </Button>
        <Button
          size='sm'
          aria-label='add youtube video'
          className={css.button}
        >
          <Icon icon='mdi:youtube' />
        </Button>
      </div>
    </>
  );
}
