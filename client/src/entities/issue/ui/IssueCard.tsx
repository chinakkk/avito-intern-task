import { FC } from 'react';
import { Card, Tag, Typography } from 'antd';
import { IssueType } from 'src/entities/issue/model/types/issueTypes';

interface IssueCardProps {
  issue: IssueType;
  onClick?: () => void;
}

const statusColor: Record<IssueType['status'], string> = {
  Backlog: 'default',
  InProgress: 'processing',
  Done: 'success',
};

const priorityColor: Record<IssueType['priority'], string> = {
  Low: 'green',
  Medium: 'orange',
  High: 'red',
};

export const IssueCard: FC<IssueCardProps> = ({ issue, onClick }) => {
  return (
    <Card hoverable onClick={onClick} className="mb-2 cursor-pointer">
      <div className="flex justify-between items-start">
        <Typography.Text strong>{issue.title}</Typography.Text>
        <Tag color={priorityColor[issue.priority]}>{issue.priority}</Tag>
      </div>

      {issue.description && (
        <Typography.Paragraph className={'max-w-[90%]'} type="secondary" ellipsis={{ rows: 2 }}>
          {issue.description}
        </Typography.Paragraph>
      )}

      <div className="flex justify-between mt-2">
        <Tag color={statusColor[issue.status]}>{issue.status}</Tag>
        {issue.assignee && (
          <Typography.Text type="secondary">Исполнитель: {issue.assignee.fullName}</Typography.Text>
        )}
      </div>
    </Card>
  );
};
