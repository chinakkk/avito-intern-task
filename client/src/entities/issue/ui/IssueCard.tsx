import { FC } from 'react';
import { Card, Typography } from 'antd';
import { IssueType } from 'src/entities/issue/model/types/issueTypes';
import { RenderPriorityTag, RenderStatusTag } from 'src/shared/lib/render/RenderTags';

interface OrderCardProps {
  issue: IssueType;
  onClick?: () => void;
}

export const IssueCard: FC<OrderCardProps> = ({ issue, onClick }) => {
  return (
    <Card hoverable onClick={onClick} className="cursor-pointe">
      <Typography.Text strong className="block mb-1">
        {issue.title}
      </Typography.Text>

      {issue.description && (
        <Typography.Paragraph type="secondary" ellipsis={{ rows: 2 }} className="mb-3">
          {issue.description}
        </Typography.Paragraph>
      )}

      <div className="flex gap-2">
        {RenderStatusTag(issue.status)}
        {RenderPriorityTag(issue.priority)}
      </div>
    </Card>
  );
};
