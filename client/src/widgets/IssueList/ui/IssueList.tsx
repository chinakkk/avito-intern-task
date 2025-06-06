import { FC } from 'react';
import { Skeleton, Empty } from 'antd';
import { useIssuesQuery } from 'src/entities/issue/api/useIssuesQuery';
import { IssueCard } from 'src/entities/issue/ui';

export const IssueList: FC = () => {
  const { data, isLoading, isError } = useIssuesQuery();

  if (isLoading) return <Skeleton active />;
  if (isError) return <div>Произошла ошибка при загрузке задач.</div>;
  if (!data?.length) return <Empty description="Задачи не найдены" />;

  return (
    <div className="flex flex-col gap-2">
      {data.map(issue => (
        <IssueCard key={issue.id} issue={issue} />
      ))}
    </div>
  );
};
