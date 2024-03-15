import { useMutation } from '@tanstack/react-query';
import { createPost } from '@/src/features';
import { ICreatePost } from '@/src/entities';

export function useCreatePost() {
  const queryResponse = useMutation({
    mutationFn: (postData: ICreatePost) => createPost(postData),
  });

  return queryResponse;
}
