import { Post } from '@prisma/client';
import { IPatchPost } from '@/src/entities';
import { Api } from '@/src/common';

export async function patchPost(id: string, postData: IPatchPost) {
  const { data, } = await Api.patch<Post, IPatchPost>(
    `/posts/${id}`,
    postData
  );

  return data;
}
