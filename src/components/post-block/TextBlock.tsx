'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { marked } from 'marked';
import { TextBlockItem } from '@/src/entities';

interface Props {
  block: TextBlockItem;
  styles?: ClassNameValue;
}

export function TextBlock({ block, styles, }: Props) {
  const { text, } = block;
  const parsed = marked(text) as string;
  const parsedText = parsed
    .replace('<p>', '')
    .replace('</p>', '');

  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
  };

  return (
    <>
      <p
        className={css.default}
        dangerouslySetInnerHTML={{
          __html: parsedText,
        }}
      />
    </>
  );
}
