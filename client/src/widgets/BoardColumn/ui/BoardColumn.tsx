import { FC } from 'react';
import { IssueCard } from 'src/entities/issue/ui/IssueCard';
import { IssueType } from 'src/entities/issue/model/types/issueTypes';
import { useGlobalModal } from 'src/shared/lib/modal/GlobalModalContext';
import { IssueForm } from 'src/features/issue';

interface BoardColumnProps {
  title: string;
  issues: IssueType[];
}

export const BoardColumn: FC<BoardColumnProps> = ({ title, issues }) => {
  const { openModal } = useGlobalModal();

  return (
    <div className="flex flex-col gap-2 bg-gray-50 rounded p-4 w-full min-w-[300px]">
      <h2 className="text-lg font-semibold pt-4 !mb-0 text-center">{title}</h2>
      {issues.map(issue => (
        <IssueCard
          onClick={() =>
            openModal({
              title: 'Просмотр задачи',
              content: <IssueForm type={'view'} selectedIssue={issue} />,
            })
          }
          key={issue.id}
          issue={issue}
        />
      ))}
    </div>
  );
};
