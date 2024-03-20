'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { Post } from '@prisma/client';
import { useContent } from '@/src/common';
import { ItemBlock } from '@/src/components';

interface Props {
  post: Post;
  styles?: ClassNameValue;
}

export function ContentDetail({ post, styles, }: Props) {
  const content = useContent(post);

  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
  };

  return (
    <>
      {content.length === 0 && (
        <div>
          <div>내용이 없습니다.</div>
        </div>
      )}
      {content.map((block) => (
        <ItemBlock key={block.id} block={block} />
      ))}
    </>
  );
}
