import { Post } from '@prisma/client';
import { Api } from '@/src/common';

export async function deletePost(id: string) {
  const { data, } = await Api.delete<Post>(
    `/posts/${id}`
  );

  return data;
}
