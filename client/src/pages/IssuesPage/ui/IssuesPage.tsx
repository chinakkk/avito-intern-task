import { FC } from 'react';
import {
  IssueSearchInput,
  IssuesFilter,
  useIssueFilters,
  useIssueSearch,
} from 'src/features/issue';
import { IssueList } from 'src/widgets/IssueList';
import { useBoardsQuery } from 'src/entities/board/api/useBoardsQuery';

export const IssuesPage: FC = () => {
  const { searchTerm, debouncedSearchTerm, setSearchTerm } = useIssueSearch();
  const { filters, setStatus, setBoardId } = useIssueFilters();
  const { data: boards = [] } = useBoardsQuery();

  return (
    <div className="flex flex-col flex-1">
      <div className={'flex justify-between'}>
        <IssueSearchInput value={searchTerm} onChange={setSearchTerm} />

        <IssuesFilter
          status={filters.status}
          boardId={filters.boardId}
          setStatus={setStatus}
          setBoardId={setBoardId}
          boards={boards}
        />
      </div>

      <IssueList filters={filters} searchTerm={debouncedSearchTerm} />
    </div>
  );
};
