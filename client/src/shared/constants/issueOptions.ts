import { IssuePriorityType, IssueStatusType } from 'src/entities/issue/model/types/issueTypes';

export const PRIORITY_OPTIONS = [
  { label: 'Низкий', value: 'Low' },
  { label: 'Средний', value: 'Medium' },
  { label: 'Высокий', value: 'High' },
] as const satisfies readonly { label: string; value: IssuePriorityType }[];

export const STATUS_OPTIONS = [
  { label: 'К выполнению', value: 'Backlog' },
  { label: 'В процессе', value: 'InProgress' },
  { label: 'Готово', value: 'Done' },
] as const satisfies readonly { label: string; value: IssueStatusType }[];
