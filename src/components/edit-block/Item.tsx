'use client';

import React from 'react';
import { BlockItem, HeadingBlockItem, TextBlockItem } from '@/src/entities';
import { HeadingItem, TextItem } from '@/src/components';

interface Props {
  block: BlockItem
  content: BlockItem[];
}

export function Item({ block, content, }: Props) {
  const { name, } = block;

  return (
    <>
      {name === 'TEXT' && (
        <TextItem block={block as TextBlockItem} content={content} />
      )}
      {name === 'HEADING' && (
        <HeadingItem block={block as HeadingBlockItem} content={content} />
      )}
    </>
  );
}
