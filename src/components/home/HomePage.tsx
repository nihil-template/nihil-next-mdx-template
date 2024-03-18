'use client';

import React, { useEffect } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { useQueryClient } from '@tanstack/react-query';
import { getPosts } from '@/src/features';

interface Props {
  styles?: ClassNameValue;
}

export function HomePage({ styles, }: Props) {
  const qc = useQueryClient();

  useEffect(() => {
    qc.prefetchQuery({
      queryKey: [ 'getPosts', ],
      queryFn: getPosts,
    });
  }, []);

  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
  };

  return (
    <>
      <div className={css.default}>content</div>
    </>
  );
}
