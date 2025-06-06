import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from 'src/shared/api/axiosInstance';
import { IssueType } from 'src/entities/issue/model/types/issueTypes';

export const useIssuesQuery = () => {
  return useQuery<IssueType[]>({
    queryKey: ['issues'],
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,

    queryFn: async () => {
      const { data } = await axiosInstance.get('/tasks');
      //Ошибка на беке, приходится дважды доставать data
      return data.data;
    },
  });
};
