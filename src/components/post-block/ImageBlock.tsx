'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import Image from 'next/image';
import { ImageBlockItem } from '@/src/entities';

interface Props {
  block: ImageBlockItem;
  styles?: ClassNameValue;
}

export function ImageBlock({ block, styles, }: Props) {
  const css = {
    default: twJoin([
      `w-full mo-sm:w-full mo-md:w-full mo-md:max-w-[892px] mo-lg:max-w-[892px] h-auto`,
      styles,
    ]),
  };

  return (
    <>
      <Image
        src={block.link}
        alt={block.alt}
        priority
        className={css.default}
      />
    </>
  );
}
