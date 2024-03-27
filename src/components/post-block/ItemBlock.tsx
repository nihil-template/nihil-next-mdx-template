'use client';

import React from 'react';
import {
  BlockItem, HeadingBlockItem, ImageBlockItem, TextBlockItem
} from '@/src/entities';
import { HeadingBlock, ImageBlock, TextBlock } from '@/src/components';

interface Props {
  block: BlockItem
}

export function ItemBlock({ block, }: Props) {
  const { name, } = block;

  return (
    <>
      {name === 'TEXT' && (
        <TextBlock block={block as TextBlockItem} />
      )}
      {name === 'HEADING' && (
        <HeadingBlock block={block as HeadingBlockItem} />
      )}
      {name === 'IMAGE' && (
        <ImageBlock block={block as ImageBlockItem} />
      )}
    </>
  );
}
