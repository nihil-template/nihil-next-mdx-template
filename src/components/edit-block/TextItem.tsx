'use client';

import React, {
  useCallback, useMemo
} from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { useQueryClient } from '@tanstack/react-query';
import { Post } from '@prisma/client';
import { BlockItem, TextBlockItem } from '@/src/entities';
import {
  ApiResponse, Nihil, useInput, useUpdatePost
} from '@/src/common';

interface Props {
  block: TextBlockItem;
  content: BlockItem[];
  styles?: ClassNameValue;
}

export function TextItem({ block, content, styles, }: Props) {
  const originBlock = useMemo(() => {
    return block;
  }, []);

  const text = useInput<HTMLTextAreaElement>({
    id: 'text',
    initValue: block.text,
  });

  const restoreText = useCallback(
    () => {
      text.setState(originBlock.text);
    },
    []
  );

  console.log('text >> ', text.data.value);

  const qc = useQueryClient();

  const updatePost = useUpdatePost(block.postId);

  const saveText = useCallback(
    () => {
      const findBlock = content.find(
        (item) => item.id === block.id
      ) as TextBlockItem;

      findBlock.text = text.data.value;

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
      text.setState('');
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
            {...text.data}
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
