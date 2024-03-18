'use client';

import React, { useEffect } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { Post } from '@prisma/client';
import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import { Checkbox } from '@/src/shadcn';
import { Nihil } from '@/src/common';
import { getPostById } from '@/src/features';

interface Props {
  post: Post;
  styles?: ClassNameValue;
}

export function BoardItem({ post, styles, }: Props) {
  const qc = useQueryClient();

  useEffect(() => {
    qc.prefetchQuery({
      queryKey: [ 'getPostById', post.id, ],
      queryFn: () => getPostById(post.id),
    });
  }, [ post.id, ]);

  const css = {
    default: twJoin([
      `flex flex-row divide-x divide-black-100 border-b border-black-100 hover:bg-black-100`,
      styles,
    ]),
  };

  return (
    <>
      <div className={css.default}>
        <div className='basis-[35px] shrink-0 flex items-center justify-center p-2'>
          <Checkbox />
        </div>
        <div className='flex-1 shrink-0'>
          <Link href={`/posts/${post.id}`} className='block p-2'>{post.title}</Link>
        </div>
        <div className='p-2'>
          <span>{Nihil.date(post.createdAt).format('YYYY년 M월 D일 HH:mm:ss')}</span>
        </div>
      </div>
    </>
  );
}
