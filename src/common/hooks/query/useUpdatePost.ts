import { useMutation } from '@tanstack/react-query';
import { IPatchPost } from '@/src/entities';
import { patchPost } from '@/src/features';

export function useUpdatePost(id: string) {
  const queryResponse = useMutation({
    mutationFn: (postData: IPatchPost) => patchPost(id, postData),
  });

  return queryResponse;
}
