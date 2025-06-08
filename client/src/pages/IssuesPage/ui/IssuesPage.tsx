import { FC, useMemo } from 'react';
import { IssueForm, IssueSearchInput, IssuesFilter } from 'src/features/issue';
import { IssueList } from 'src/widgets/IssueList';
import { useBoardsQuery } from 'src/entities/board/api/useBoardsQuery';
import {
  useFiltrationActions,
  useFiltrationState,
} from 'src/features/issue/model/slice/filtrationSlice';
import { useIssuesQuery } from 'src/entities/issue/api/useIssuesQuery';
import { useDebounce } from 'src/shared/lib/hooks/useDebounce';
import { filterIssues } from 'src/features/issue/lib/filterIssues';
import { PageLayout } from 'src/shared/ui';
import { FloatingActionButton } from 'src/shared/ui/compontents/FloatingActionButton';
import { useGlobalModal } from 'src/shared/lib/modal/GlobalModalContext';
import { Card } from 'antd';
import { PageTitle } from 'src/shared/ui/compontents/PageTitle';

//Страница со всеми задачами

export const IssuesPage: FC = () => {
  const { data: issuesData = [] } = useIssuesQuery();
  const { data: boardsData = [] } = useBoardsQuery();
  const { search, filtration } = useFiltrationState();
  const { setSearch, setStatus, setBoardId } = useFiltrationActions();
  const { openModal } = useGlobalModal();

  const debouncedSearch = useDebounce(search, 300);

  //Фильтрация задач
  const filteredIssues = useMemo(
    () => filterIssues(issuesData, debouncedSearch, filtration),
    [issuesData, debouncedSearch, filtration],
  );

  return (
    <PageLayout>
      <PageTitle title={'Все задачи'} />
      <Card
        styles={{ body: { width: '100%', display: 'flex', padding: '16px' } }}
        className={'flex justify-between w-full !mb-4'}
      >
        <IssueSearchInput value={search} onChange={setSearch} className={'!mr-2'} />
        <IssuesFilter
          status={filtration.status}
          boardId={filtration.boardId}
          setStatus={setStatus}
          setBoardId={setBoardId}
          boards={boardsData}
        />
      </Card>
      <IssueList issues={filteredIssues} />
      <FloatingActionButton
        onClick={() => openModal({ title: 'Создать задачу', content: <IssueForm /> })}
      />
    </PageLayout>
  );
};
