import { FC, useEffect, useState } from 'react';
import { IssueCard } from 'src/entities/issue/ui/IssueCard';
import { Empty } from 'antd';
import { IssueType } from 'src/entities/issue/model/types/issueTypes';
import { useInView } from 'react-intersection-observer';
import { useGlobalModal } from 'src/shared/lib/modal/GlobalModalContext';
import { IssueForm } from 'src/features/issue';

const infinityStep = 10;

type IssueListProps = {
  issues: IssueType[];
};

//Рендер списка задач
//Так же реализована бесконечная подгрузка на фронте
//Из за большого объема карточек приходящих с бекенда за раз, при переходе на страницу есть задержка
//В реальном проекте, нужно подгружать данные с бека постепенно, но в данном случае пришлось сделать косылик :)

export const IssueList: FC<IssueListProps> = ({ issues }) => {
  const [visibleCount, setVisibleCount] = useState(infinityStep);
  const { ref: observerRef, inView } = useInView({});
  const { openModal } = useGlobalModal();

  useEffect(() => {
    if (inView && issues.length > visibleCount)
      setVisibleCount(prevState => prevState + infinityStep);
  }, [inView, issues.length, visibleCount]);

  if (!issues.length) return <Empty description="Нет задач" />;

  const visibleTasks = issues.slice(0, visibleCount);

  return (
    <div className="flex flex-col gap-4">
      {visibleTasks?.map(issue => (
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
      {visibleCount < issues.length && <div ref={observerRef} className="h-8" />}
    </div>
  );
};
