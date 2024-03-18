'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { Post } from '@prisma/client';
import { BoardItem } from '@/src/shadcn';
import { Nihil } from '@/src/common';

interface Props {
  data: Post[];
  styles?: ClassNameValue;
}

export function BoardList({ data, styles, }
:
Props) {
  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
  };

  return (
    <>
      <div className={css.default}>
        {data.map((post) => (
          <BoardItem key={Nihil.uuid()} post={post} />
        ))}
      </div>
    </>
  );
}
