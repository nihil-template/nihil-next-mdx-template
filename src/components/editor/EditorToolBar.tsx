'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { Icon } from '@iconify/react';
import { Post } from '@prisma/client';
import {
  useContent
} from '@/src/common';
import { Button } from '@/src/shadcn';
import { AddHeadingButton, AddImageButton, AddTextButton } from '@/src/components';

interface Props {
  post: Post;
  styles?: ClassNameValue;
}

export function EditorToolBar({ post, styles, }: Props) {
  const content = useContent(post);

  const css = {
    default: twJoin([
      `p-2 rounded-2 bg-black-100 flex gap-1`,
      styles,
    ]),
    button: twJoin([
      `bg-black-200 hover:bg-white text-black-base text-[18px]`,
    ]),
  };

  return (
    <>
      <div className={css.default}>
        <AddHeadingButton post={post} content={content} styles={css.button} />
        <AddTextButton post={post} content={content} styles={css.button} />
        <AddImageButton post={post} content={content} styles={css.button} />
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
