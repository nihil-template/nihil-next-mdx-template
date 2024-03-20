import { useMemo } from 'react';
import { Post } from '@prisma/client';
import { Nihil } from '@/src/common';
import { BlockItem } from '@/src/entities';

export const useContent = (post: Post) => {
  const content = useMemo(() => {
    return Nihil.parse<BlockItem[]>(post?.content);
  }, [ post, ]);

  return content;
};
