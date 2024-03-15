'use client';

import React, { useCallback, useMemo } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { closestCorners, DndContext } from '@dnd-kit/core';
import { Post } from '@prisma/client';
import { BlockItem, useEditStore } from '@/src/entities';
import { Item } from '@/src/components';
import { Nihil } from '@/src/common';

interface Props {
  post: Post;
  styles?: ClassNameValue;
}

export function EditorContent({ post, styles, }: Props) {
  const { postContent, } = useEditStore();

  const content = useMemo(() => {
    return Nihil.parse<BlockItem[]>(post.content);
  }, [ post, ]);

  const onSavePostContent = useCallback(
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
      <DndContext collisionDetection={closestCorners}>
        <div className={css.default}>
          {content.length !== 0 ? (
            content.map((block) => (
              <Item key={Nihil.uuid()} block={block} />
            ))
          ) : (
            postContent.map((block) => (
              <Item key={Nihil.uuid()} block={block} />
            ))
          )}
        </div>
      </DndContext>
    </>
  );
}
