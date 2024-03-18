'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { Post } from '@prisma/client';
import { BlockItem, TextBlockItem } from '@/src/entities';
import { TextItem } from '@/src/components';

interface Props {
  block: BlockItem
  content: BlockItem[];
  styles?: ClassNameValue;
}

export function Item({ block, content, styles, }: Props) {
  const { name, postId, } = block;

  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
  };

  return (
    <>
      {name === 'TEXT' && (
        <TextItem block={block as TextBlockItem} content={content} />
      )}
    </>
  );
}
