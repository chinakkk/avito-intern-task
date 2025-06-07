import { useEffect, useMemo, useState } from 'react';
import { IssueCard } from 'src/entities/issue/ui/IssueCard';
import { Skeleton, Empty } from 'antd';
import { IssueType } from 'src/entities/issue/model/types/issueTypes';
import { useIssuesQuery } from 'src/entities/issue/api/useIssuesQuery';
import { useInView } from 'react-intersection-observer';

const STEP = 10;

type Props = {
  searchTerm: string;
  filters: {
    status: string | null;
    boardId: number | null;
  };
};

export const IssueList = ({ searchTerm, filters }: Props) => {
  const { data, isLoading } = useIssuesQuery();
  const [visibleCount, setVisibleCount] = useState(STEP);
  const { ref: observerRef, inView } = useInView({});

  const filteredTasks = useMemo(() => {
    if (!data) return [];

    const term = searchTerm.toLowerCase();

    return data.filter((task: IssueType) => {
      const matchesTitle = task.title.toLowerCase().includes(term);
      const matchesAssignee = task.assignee?.fullName?.toLowerCase().includes(term);
      const matchesStatus = filters.status ? task.status === filters.status : true;
      const matchesBoard = filters.boardId ? task.boardId === filters.boardId : true;

      return (matchesTitle || matchesAssignee) && matchesStatus && matchesBoard;
    });
  }, [data, searchTerm, filters]);

  useEffect(() => {
    if (inView && filteredTasks.length > visibleCount) {
      setVisibleCount(v => v + STEP);
    }
  }, [inView, filteredTasks.length, visibleCount]);

  if (isLoading) return <Skeleton active />;
  if (!filteredTasks.length) return <Empty description="Нет задач" />;

  const visibleTasks = filteredTasks.slice(0, visibleCount);

  return (
    <div className="flex flex-col gap-4">
      {visibleTasks.map(issue => (
        <IssueCard key={issue.id} issue={issue} />
      ))}
      {visibleCount < filteredTasks.length && <div ref={observerRef} className="h-8" />}
    </div>
  );
};
