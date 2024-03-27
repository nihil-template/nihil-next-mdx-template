'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { Post } from '@prisma/client';
import { PostItem } from '@/src/components';

interface Props {
  posts: Post[];
  styles?: ClassNameValue;
}

export function PostList({ posts, styles, }: Props) {
  console.log('posts >> ', posts);

  const css = {
    default: twJoin([
      `w-[800px] flex flex-col gap-1`,
      styles,
    ]),
  };

  return (
    <>
      <h2>총 {posts?.length}개의 포스트</h2>

      <div className={css.default}>
        {posts?.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}
