import { Post } from '@prisma/client';
import { Api } from '@/src/common';

export async function getPostById(id: string) {
  const { data, } = await Api.get<Post>(
    `/posts/${id}`
  );

  return data;
}
