'use client';

import React, { ChangeEvent, useCallback, useState } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { Icon } from '@iconify/react';
import { Button, Input } from '@/src/shadcn';

interface Props {
  width?: string;
  rounded?: boolean;
  children: React.ReactNode;
  styles?: ClassNameValue;
}

export function Board({
  width, rounded, children, styles,
}: Props) {
  const [ keyword, setKeyword, ] = useState('');

  const onChangeKeyword = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setKeyword(event.target.value);
    },
    []
  );

  const css = {
    default: twJoin([
      ``,
      rounded && `rounded-2`,
      styles,
      width,
    ]),
  };

  return (
    <>
      <div className={css.default}>
        <div className='flex flex-row items-center justify-end pb-3 border-b-[2px] border-black-100'>
          <Input
            type='text'
            placeholder='검색어를 입력하세요.'
            value={keyword}
            onChange={onChangeKeyword}
            className='w-[300px] focus:border-black-base focus-visible:ring-transparent focus-visible:ring-offset-transparent rounded-r-0 transition-colors duration-200'
          />
          <Button aria-label='search' className='rounded-l-0'>
            <Icon icon='material-symbols:search' fontSize={20} />
          </Button>
        </div>
        {children}
      </div>
    </>
  );
}
