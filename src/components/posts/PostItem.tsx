'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { Post } from '@prisma/client';
import Link from 'next/link';
import { Nihil } from '@/src/common';

interface Props {
  post: Post;
  styles?: ClassNameValue;
}

export function PostItem({ post, styles, }: Props) {
  const css = {
    default: twJoin([
      `rounded-1 border border-black-200 p-2`,
      styles,
    ]),
    link: twJoin([
      `text-[1.4rem] font-900 mb-2`,
    ]),
    title: twJoin([
      `p-1 px-2 rounded-1 bg-black-100 hover:bg-black-200`,
    ]),
  };

  return (
    <>
      <div className={css.default}>
        <div>
          <Link href={`/posts/${post.id}`} className={css.link}>
            <h3 className={css.title}>{post.title}</h3>
          </Link>
          <p>{post.description}</p>
        </div>
        <div>
          {Nihil.dateToFormat(post.createdAt)}
        </div>
      </div>
    </>
  );
}
