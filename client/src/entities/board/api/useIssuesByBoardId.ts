import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from 'src/shared/api/axiosInstance';
import { IssueType } from 'src/entities/issue/model/types/issueTypes';

export const useIssuesByBoardId = (id: number) => {
  return useQuery<IssueType[]>({
    queryKey: ['issues', id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/boards/${id}`);
      return data.data; //Ошибка на беке, приходится дважды доставать data
    },
  });
};
