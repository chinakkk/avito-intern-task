import { FC, useMemo } from 'react';
import { IssueSearchInput, IssuesFilter, useIssueFilters } from 'src/features/issue';
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

//Страница со всеми задачами

export const IssuesPage: FC = () => {
  const { data: issuesData = [] } = useIssuesQuery();
  const { data: boardsData = [] } = useBoardsQuery();
  const { search, filtration } = useFiltrationState();
  const { setSearch, setStatus, setBoardId } = useFiltrationActions();

  const debouncedSearch = useDebounce(search, 300);

  //Фильтрация задач
  const filteredIssues = useMemo(
    () => filterIssues(issuesData, debouncedSearch, filtration),
    [issuesData, debouncedSearch, filtration],
  );

  return (
    <PageLayout>
      <div className={'flex justify-between'}>
        <IssueSearchInput value={search} onChange={setSearch} />
        <IssuesFilter
          status={filtration.status}
          boardId={filtration.boardId}
          setStatus={setStatus}
          setBoardId={setBoardId}
          boards={boardsData}
        />
      </div>
      <IssueList issues={filteredIssues} />
    </PageLayout>
  );
};
