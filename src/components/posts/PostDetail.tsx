'use client';

import React, { useCallback, useEffect } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { useParams, useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useGetPostById } from '@/src/common';
import { Button } from '@/src/shadcn';
import { getPosts } from '@/src/features';
import { ContentDetail } from '@/src/components';

interface Props {
  styles?: ClassNameValue;
}

type PostParams = {
  id: string;
}

export function PostDetail({ styles, }: Props) {
  const params = useParams<PostParams>();

  const qc = useQueryClient();

  const {
    data: post,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetPostById(params.id);

  const router = useRouter();

  const onClickEdit = useCallback(
    () => {
      router.push(`/posts/${post.data.id}/edit`);
    },
    []
  );

  const onClickList = useCallback(
    () => {
      router.push('/posts');
    },
    []
  );

  useEffect(() => {
    qc.prefetchQuery({
      queryKey: [ 'getPosts', ],
      queryFn: getPosts,
    });
  }, [ qc, ]);

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
        <Button onClick={onClickList}>목록</Button>
        <Button onClick={onClickEdit}>수정</Button>
      </div>

      <div className={css.default}>
        <div id='title'>{post.data.title}</div>
        <div id='description'>{post.data.description}</div>

        <ContentDetail post={post.data} />
      </div>
    </>
  );
}
