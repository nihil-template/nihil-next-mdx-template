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
      `w-full mo-sm:w-full mo-md:max-w-[900px] mo-lg:max-w-[900px] mx-auto`,
      styles,
    ]),
    topButton: twJoin([
      `w-full mo-sm:w-full mo-md:max-w-[900px] mo-lg:max-w-[900px] mx-auto text-right mb-2`,
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
      <div className={css.topButton}>
        <Button size='sm' onClick={onClickDetail}>포스트로 돌아가기</Button>
      </div>

      <div className={css.default}>
        <EditorToolBar post={post.data} />
        <EditorContent post={post.data} />
      </div>
    </>
  );
}
