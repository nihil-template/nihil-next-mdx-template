'use client';

import React, { ChangeEvent, useCallback, useState } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { TextBlockItem } from '@/src/entities';

interface Props {
  block: TextBlockItem;
  styles?: ClassNameValue;
}

export function TextItem({ block, styles, }: Props) {
  const [ text, setText, ] = useState(block.text);

  console.log('text >> ', text);

  const onChangeText = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setText(event.target.value);
    },
    []
  );

  const saveText = useCallback(
    () => {

    },
    []
  );

  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
  };

  return (
    <>
      <div className={css.default}>
        <div>여기에 메뉴</div>
        <div>
          <textarea
            value={text}
            onChange={onChangeText}
          />
        </div>
        <div>
          <button>저장</button>
          <button>비우기</button>
        </div>
      </div>
    </>
  );
}
