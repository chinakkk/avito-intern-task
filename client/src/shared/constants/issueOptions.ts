import { IssuePriorityType, IssueStatusType } from 'src/entities/issue/model/types/issueTypes';

export type StatusOptionType = { label: string; value: IssueStatusType; color: string };
export type PriorityOptionType = { label: string; value: IssuePriorityType; color: string };

export const PRIORITY_OPTIONS = [
  { label: 'Низкий', value: 'Low', color: 'green' },
  { label: 'Средний', value: 'Medium', color: 'orange' },
  { label: 'Высокий', value: 'High', color: 'red' },
] as const satisfies readonly PriorityOptionType[];

export const STATUS_OPTIONS = [
  { label: 'К выполнению', value: 'Backlog', color: 'default' },
  { label: 'В процессе', value: 'InProgress', color: 'blue' },
  { label: 'Готово', value: 'Done', color: 'green' },
] as const satisfies readonly StatusOptionType[];
