'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { BlockItem, TextBlockItem } from '@/src/entities';
import { TextItem } from '@/src/components';

interface Props {
  block: BlockItem
  styles?: ClassNameValue;
}

export function Item({ block, styles, }: Props) {
  const { name, postId, } = block;

  console.log(block);

  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
  };

  return (
    <>
      {name === 'TEXT' && (
        <TextItem block={block as TextBlockItem} />
      )}
    </>
  );
}
