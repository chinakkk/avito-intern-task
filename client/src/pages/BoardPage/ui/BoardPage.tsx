import { useParams, useLocation } from 'react-router-dom';
import { useBoardsQuery } from 'src/entities/board/api/useBoardsQuery';
import { BoardColumn } from 'src/widgets/BoardColumn/ui';
import { useIssuesByBoardId } from 'src/entities/board/api/useIssuesByBoardId';

export const BoardPage = () => {
  const { id } = useParams<{ id: string }>();
  const boardId = Number(id);

  const location = useLocation();
  const routeState = location.state as { boardName?: string; boardDescription?: string } | null;

  const { data: issuesData, isLoading: issueLoading } = useIssuesByBoardId(boardId);
  const { data: boardsData, isLoading: boardsLoading } = useBoardsQuery({ enabled: !routeState });

  const boardFromList = boardsData?.find(b => b.id === boardId);

  const boardName = routeState?.boardName ?? boardFromList?.name;
  const boardDescription = routeState?.boardDescription ?? boardFromList?.description;

  if (issueLoading || (!routeState && boardsLoading)) return <div className="p-4">Загрузка...</div>;
  const issues = issuesData?.map(issue => ({
    ...issue,
    boardId: boardId,
    boardNameFix: boardName,
  }));

  return (
    <div className="p-4 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">{boardName}</h1>
      {boardDescription && <p className="text-gray-500">{boardDescription}</p>}

      <div className="flex gap-4 overflow-x-auto">
        {['Backlog', 'InProgress', 'Done'].map(status => (
          <BoardColumn
            key={status}
            title={status}
            issues={issues?.filter(issue => issue.status === status) || []}
          />
        ))}
      </div>
    </div>
  );
};
