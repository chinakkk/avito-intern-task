export type IssuePriorityType = 'Low' | 'Medium' | 'High';
export type IssueStatusType = 'Backlog' | 'InProgress' | 'Done';

export type IssueType = {
  id: number;
  boardId: number;
  description?: string;
  title: string;
  priority: IssuePriorityType;
  status: IssueStatusType;
  assignee?: {
    id: number;
    fullName: string;
    email: string;
    avatarUrl?: string;
  };
  boardNameFix: string;
};
