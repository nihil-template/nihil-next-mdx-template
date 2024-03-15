import { useQuery } from '@tanstack/react-query';
import { keysData } from '@/src/common';
import { getPostById } from '@/src/features';

export function useGetPostById(id: string) {
  const queryResponse = useQuery({
    queryKey: keysData.post.getById(id),
    queryFn: () => getPostById(id),
    enabled: !!id,
  });

  return queryResponse;
}
