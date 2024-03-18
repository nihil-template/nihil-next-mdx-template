'use client';

import React, { useCallback } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { closestCorners, DndContext } from '@dnd-kit/core';
import { Post } from '@prisma/client';
import { Item } from '@/src/components';
import { Nihil, useContent } from '@/src/common';

interface Props {
  post: Post;
  styles?: ClassNameValue;
}

export function EditorContent({ post, styles, }: Props) {
  const content = useContent(post);

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
          {content.map((block) => (
            <Item key={Nihil.uuid()} block={block} content={content} />
          ))}
        </div>
      </DndContext>
    </>
  );
}
