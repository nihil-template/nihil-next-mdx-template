'use client';

import React, { useCallback } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { Icon } from '@iconify/react';
import { TextBlockItem, useEditStore } from '@/src/entities';
import { Nihil } from '@/src/common';

interface Props {
  postId: string;
  styles?: ClassNameValue;
}

export function EditorToolBar({ postId, styles, }: Props) {
  const { postContent, addBlock, } = useEditStore(
    useCallback((state) => state, [])
  );

  const onClickAddText = () => {
    addBlock({
      id: Nihil.uuid(),
      postId,
      name: 'TEXT',
      text: '',
    } as TextBlockItem);
  };

  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
  };

  return (
    <>
      <div className={css.default}>
        <button aria-label='add heading'>
          <Icon icon='gravity-ui:heading' />
        </button>
        <button
          aria-label='add text'
          onClick={onClickAddText}
        >
          <Icon icon='mdi:format-text' />
        </button>
        <button aria-label='add image'>
          <Icon icon='mdi:file-image' />
        </button>
        <button aria-label='add ordered list'>
          <Icon icon='mdi:format-list-bulleted' />
        </button>
        <button aria-label='add unordered list'>
          <Icon icon='mdi:format-list-numbered' />
        </button>
        <button aria-label='add message'>
          <Icon icon='ant-design:message-filled' />
        </button>
        <button aria-label='add quote'>
          <Icon icon='mdi:format-quote-open' />
        </button>
        <button aria-label='add codeblock'>
          <Icon icon='mdi:code' />
        </button>
        <button aria-label='add youtube video'>
          <Icon icon='mdi:youtube' />
        </button>
      </div>
    </>
  );
}
