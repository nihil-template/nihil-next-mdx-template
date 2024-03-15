import { Post } from '@prisma/client';
import { ICreatePost } from '@/src/entities';
import { Api } from '@/src/common';

export async function createPost(postData: ICreatePost) {
  const { data, } = await Api.post<Post, ICreatePost>(
    '/posts',
    postData
  );

  return data;
}
