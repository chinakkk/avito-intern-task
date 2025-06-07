import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from 'src/shared/api/axiosInstance';
import { IssuePriorityType, IssueStatusType } from 'src/entities/issue/model/types/issueTypes';

export type UpdateIssueType = {
  id: number;
  boardId: number;
  assigneeId?: number;
  description?: string;
  title: string;
  priority: IssuePriorityType;
  status: IssueStatusType;
};
export const useUpdateIssueMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedIssue: UpdateIssueType) => {
      const { id, ...rest } = updatedIssue;
      const { data } = await axiosInstance.put(`tasks/update/${id}`, rest);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issues'] });
    },
  });
};
