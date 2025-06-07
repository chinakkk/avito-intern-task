import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from 'src/shared/api/axiosInstance';
import { IssuePriorityType, IssueStatusType } from 'src/entities/issue/model/types/issueTypes';

export type CreateIssueType = {
  boardId: number;
  assigneeId?: number;
  description?: string;
  title: string;
  priority: IssuePriorityType;
  status: IssueStatusType;
};

export const useCreateIssueMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateIssueType) => axiosInstance.post('tasks/create', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issues'] });
    },
  });
};
