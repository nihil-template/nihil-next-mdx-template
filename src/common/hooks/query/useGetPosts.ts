import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@/src/features';
import { keysData } from '@/src/common';

export function useGetPosts() {
  const queryResponse = useQuery({
    queryKey: keysData.post.getAll,
    queryFn: getPosts,
  });

  return queryResponse;
}
