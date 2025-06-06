import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from 'src/shared/api/axiosInstance';
import { IssueType } from 'src/entities/issue/model/types/issueTypes';

export type CreateIssueType = Omit<IssueType, 'id'>;

export const useCreateIssueMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateIssueType) => axiosInstance.post('tasks/create', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issues'] });
    },
  });
};
