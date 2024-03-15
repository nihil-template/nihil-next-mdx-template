import React from 'react';
import { setMeta } from '@/src/common';
import { PostList } from '@/src/components';

interface Props {
  //
}

export const metadata = setMeta({
  title: '글 목록',
  url: '/posts',
});

export default function page() {
  return (
    <>
      <PostList />
    </>
  );
}
