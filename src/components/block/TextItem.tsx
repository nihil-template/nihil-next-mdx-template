'use client';

import React, { ChangeEvent, useCallback, useState } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { useQueryClient } from '@tanstack/react-query';
import { Post } from '@prisma/client';
import { BlockItem, TextBlockItem } from '@/src/entities';
import { ApiResponse, Nihil, useUpdatePost } from '@/src/common';

interface Props {
  block: TextBlockItem;
  content: BlockItem[];
  styles?: ClassNameValue;
}

export function TextItem({ block, content, styles, }: Props) {
  const [ text, setText, ] = useState(block.text);
  const [ restoreBlock, ] = useState(block);

  const qc = useQueryClient();

  const updatePost = useUpdatePost(block.postId);

  const onChangeText = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setText(event.target.value);
    },
    []
  );

  const restoreText = useCallback(
    () => {
      setText(restoreBlock.text);
    },
    [ restoreBlock, ]
  );

  const saveText = useCallback(
    () => {
      const findBlock = content.find(
        (item) => item.id === block.id
      ) as TextBlockItem;

      findBlock.text = text;

      updatePost.mutate({
        content: Nihil.string(content),
      }, {
        onSuccess({ data: post, }) {
          qc.setQueryData(
            [ 'getPostById', post.id, ],
            (oldPost: ApiResponse<Post>) => (
              { ...oldPost, data: post, }
            )
          );
        },
      });
    },
    [ block, text, ]
  );

  const resetText = useCallback(
    () => {
      const findBlock = content.find(
        (item) => item.id === block.id
      ) as TextBlockItem;

      findBlock.text = '';
      setText('');
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
          <button onClick={restoreText}>되돌리기</button>
          <button onClick={saveText}>저장</button>
          <button onClick={resetText}>비우기</button>
        </div>
      </div>
    </>
  );
}
