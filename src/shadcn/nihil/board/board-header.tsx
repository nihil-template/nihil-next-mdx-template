'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { Checkbox } from '@/src/shadcn';

interface Props {
  styles?: ClassNameValue;
}

export function BoardHeader({ styles, }
:
Props) {
  const css = {
    default: twJoin([
      `flex flex-row divide-x divide-black-100`,
      styles,
    ]),
  };

  return (
    <>
      <div className={css.default}>
        <div className='basis-[35px] shrink-0 flex items-center justify-center p-2'>
          <Checkbox />
        </div>
        <div className='flex-1 shrink-0 p-2'>
          <span>제목</span>
        </div>
        <div className='p-2'>
          <span>작성일자</span>
        </div>
      </div>
    </>
  );
}
