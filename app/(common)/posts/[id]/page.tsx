import React from 'react';
import { setMeta } from '@/src/common';
import { getPostById } from '@/src/features';
import { PostEditor } from '@/src/components';

interface Props {
  params: {id: string};
}

export async function generateMetadata({ params, }: Props) {
  const { data: post, } = await getPostById(params.id);

  return setMeta({
    title: post ? post.title : '로딩중',
    url: `/posts/${params.id}`,
  });
}

export default function page() {
  return (
    <>
      <PostEditor />
    </>
  );
}
