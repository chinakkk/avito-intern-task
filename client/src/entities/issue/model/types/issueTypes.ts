export type IssuePriorityType = 'Low' | 'Medium' | 'High';
export type IssueStatusType = 'Backlog' | 'InProgress' | 'Done';

export type IssueType = {
  id: number;
  boardId: number;
  assigneeId?: number;
  description?: string;
  title: string;
  priority: IssuePriorityType;
  status: IssueStatusType;
};
