import React from 'react';
import { setMeta } from '@/src/common';
import { getPostById } from '@/src/features';

interface Props {
  params: {id: string};
}

// export const metadata = setMeta({
//   title: '글 수정',
//   url: '/posts/edit',
// });

export async function generateMetadata({ params, }: Props) {
  const { data: post, } = await getPostById(params.id);

  return setMeta({
    title: '글 수정',
    url: `/posts/${post.id}/edit`,
  });
}

export default function PostEditPage() {
  return (
    <>
      <div>content</div>
    </>
  );
}
