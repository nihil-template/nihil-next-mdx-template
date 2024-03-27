'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { Post } from '@prisma/client';
import {
  useContent
} from '@/src/common';
import {
  AddCodeButton,
  AddHeadingButton, AddImageButton, AddListButton, AddMessageButton, AddQuoteButton, AddTextButton, AddYoutubeButton
} from '@/src/components';

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
        <AddListButton post={post} type='ORDERED' content={content} styles={css.button} />
        <AddListButton post={post} type='UNORDERED' content={content} styles={css.button} />
        <AddMessageButton post={post} content={content} styles={css.button} />
        <AddQuoteButton post={post} content={content} styles={css.button} />
        <AddCodeButton post={post} content={content} styles={css.button} />
        <AddYoutubeButton post={post} content={content} styles={css.button} />
      </div>
    </>
  );
}
