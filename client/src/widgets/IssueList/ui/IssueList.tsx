import { useEffect, useState } from 'react';
import { IssueCard } from 'src/entities/issue/ui/IssueCard';
import { Skeleton, Empty } from 'antd';
import { IssueType } from 'src/entities/issue/model/types/issueTypes';
import { useIssuesQuery } from 'src/entities/issue/api/useIssuesQuery';
import { useInView } from 'react-intersection-observer';
import { useModalIssuesActions } from 'src/entities/modal/model/modalIssuesSlice';

const STEP = 10;

export const IssueList = () => {
  const { data, isLoading } = useIssuesQuery();
  const [visibleCount, setVisibleCount] = useState(STEP);
  const { ref: observerRef, inView } = useInView({});

  useEffect(() => {
    if (inView && data && visibleCount < data.length) {
      setVisibleCount(v => v + STEP);
    }
  }, [inView, data, visibleCount]);

  if (isLoading) return <Skeleton active />;
  if (!data || data.length === 0) return <Empty description="Нет задач" />;

  const visibleTasks = data.slice(0, visibleCount);

  return (
    <div className="flex flex-col gap-4">
      {visibleTasks.map((issue: IssueType) => (
        <IssueCard key={issue.id} issue={issue} />
      ))}

      {visibleCount < data.length && <div ref={observerRef} className="h-8" />}
    </div>
  );
};
