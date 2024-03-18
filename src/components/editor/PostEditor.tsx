'use client';

import React, { useCallback } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { useParams, useRouter } from 'next/navigation';
import { EditorContent, EditorToolBar } from '@/src/components';
import { useGetPostById } from '@/src/common';
import { Button } from '@/src/shadcn';

interface Props {
  styles?: ClassNameValue;
}

type PostParams = {
  id: string;
}

export function PostEditor({ styles, }: Props) {
  const params = useParams<PostParams>();

  const {
    data: post,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetPostById(params.id);

  const router = useRouter();

  const onClickDetail = useCallback(
    () => {
      router.push(`/posts/${params.id}`);
    },
    [ params, ]
  );

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
      <div>
        <Button onClick={onClickDetail}>포스트로 돌아가기</Button>
      </div>

      <div className={css.default}>
        <EditorToolBar post={post.data} />
        <EditorContent post={post.data} />
      </div>
    </>
  );
}
