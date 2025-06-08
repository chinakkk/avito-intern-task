import { IssuePriorityType, IssueStatusType } from 'src/entities/issue/model/types/issueTypes';
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from 'src/shared/constants/issueOptions';
import { Tag } from 'antd';

export const RenderPriorityTag = (priority: IssuePriorityType) => {
  const selected = PRIORITY_OPTIONS.find(p => p.value === priority);
  return <Tag color={selected?.color || 'default'}>{selected?.label}</Tag>;
};

export const RenderStatusTag = (status: IssueStatusType) => {
  const selected = STATUS_OPTIONS.find(s => s.value === status);
  return <Tag color={selected?.color || 'default'}>{selected?.label}</Tag>;
};
