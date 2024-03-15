'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { useParams } from 'next/navigation';
import { EditorContent, EditorToolBar } from '@/src/components';
import { useGetPostById } from '@/src/common';

interface Props {
  styles?: ClassNameValue;
}

type PostParams = {
  id: string;
}

export function PostEditor({ styles, }: Props) {
  const params = useParams<PostParams>();

  console.log('params >> ', params);

  const {
    data: post,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetPostById(params.id);

  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
  };

  if (isLoading || isFetching) {
    return (
      <>
        <div>로딩중..</div>
      </>
    );
  }

  return (
    <>
      <div className={css.default}>
        <EditorToolBar postId={post.data.id} />
        <EditorContent post={post.data} />
      </div>
    </>
  );
}
