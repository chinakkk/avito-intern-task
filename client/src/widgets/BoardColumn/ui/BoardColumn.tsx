import { FC } from 'react';
import { IssueCard } from 'src/entities/issue/ui/IssueCard';
import { IssueType } from 'src/entities/issue/model/types/issueTypes';
import { useGlobalModal } from 'src/shared/lib/modal/GlobalModalContext';
import { IssueForm } from 'src/features/issue';
import { Card } from 'antd';

interface BoardColumnProps {
  title: string;
  issues: IssueType[];
}

export const BoardColumn: FC<BoardColumnProps> = ({ title, issues }) => {
  const { openModal } = useGlobalModal();

  return (
    <div className="flex flex-col gap-2 rounded p-4 w-full min-w-[300px]">
      <Card styles={{ body: { padding: '8px 0' } }}>
        <h2 className="text-base font-semibold flex  justify-start !mb-0 text-left !pl-6">
          {title}
        </h2>
      </Card>

      {issues.map(issue => (
        <IssueCard
          onClick={() =>
            openModal({
              title: 'Просмотр задачи',
              content: <IssueForm selectedIssue={issue} />,
            })
          }
          key={issue.id}
          issue={issue}
        />
      ))}
    </div>
  );
};
