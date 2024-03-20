'use client';

import React, { useCallback, useMemo } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { useQueryClient } from '@tanstack/react-query';
import { Post } from '@prisma/client';
import { BlockItem, HeadingBlockItem } from '@/src/entities';
import {
  ApiResponse, Nihil, useInput, useUpdatePost
} from '@/src/common';

interface Props {
  block: HeadingBlockItem;
  content: BlockItem[];
  styles?: ClassNameValue;
}

export function HeadingItem({ block, content, styles, }: Props) {
  const originBlock = useMemo(() => {
    return block;
  }, []);

  const level = useInput<HTMLSelectElement>({
    id: 'level',
    initValue: block.level,
  });

  const text = useInput<HTMLTextAreaElement>({
    id: 'text',
    initValue: block.text,
  });

  const qc = useQueryClient();

  const updatePost = useUpdatePost(block.postId);

  const restoreBlock = useCallback(
    () => {
      text.setState(originBlock.text);
      level.setState(originBlock.level);
    },
    []
  );

  const resetBlock = useCallback(
    () => {
      text.setState('');
      level.setState('none');
    },
    []
  );

  const saveBlock = useCallback(
    () => {
      const findBlock = content.find(
        (item) => item.id === block.id
      ) as HeadingBlockItem;

      findBlock.level = level.data.value as ('h2' | 'h3' | 'h4' | 'h5' | 'h6');
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
    [ block, text, level, ]
  );

  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
    select: twJoin([
      ``,
    ]),
    text: twJoin([
      ``,
    ]),
  };

  return (
    <>
      <div className={css.default}>
        <div>
          <select
            {...level.data}
            className={css.select}
          >
            <option value='none'>--선택하세요--</option>
            <option value='h2'>H2</option>
            <option value='h3'>H3</option>
            <option value='h4'>H4</option>
            <option value='h5'>H5</option>
            <option value='h6'>H6</option>
          </select>
        </div>
        <div>
          <textarea
            {...text.data}
            className={css.text}
          />
        </div>
        <div>
          <button onClick={restoreBlock}>되돌리기</button>
          <button onClick={saveBlock}>저장</button>
          <button onClick={resetBlock}>비우기</button>
        </div>
      </div>
    </>
  );
}
