import { FC } from 'react';
import { IssueCard } from 'src/entities/issue/ui/IssueCard';
import { IssueType } from 'src/entities/issue/model/types/issueTypes';

interface Props {
  title: string;
  issues: IssueType[];
}

export const BoardColumn: FC<Props> = ({ title, issues }) => (
  <div className="flex flex-col gap-2 bg-gray-50 rounded p-4 w-full min-w-[300px]">
    <h2 className="text-lg font-semibold mb-2">{title}</h2>
    {issues.map(issue => (
      <IssueCard key={issue.id} issue={issue} />
    ))}
  </div>
);
