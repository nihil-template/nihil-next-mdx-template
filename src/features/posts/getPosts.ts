import { Post } from '@prisma/client';
import { Api } from '@/src/common';

export async function getPosts() {
  const { data, } = await Api.get<Post[]>(
    '/posts'
  );

  return data;
}
