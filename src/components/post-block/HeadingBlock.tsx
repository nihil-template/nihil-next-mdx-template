'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { HeadingBlockItem } from '@/src/entities';

interface Props {
  block: HeadingBlockItem;
  styles?: ClassNameValue;
}

export function HeadingBlock({ block, styles, }: Props) {
  const { level: Level, text, } = block;

  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
  };

  return (
    <>
      <Level className={css.default}>{text}</Level>
    </>
  );
}
