import { useParams, useLocation } from 'react-router-dom';
import { useBoardsQuery } from 'src/entities/board/api/useBoardsQuery';
import { BoardColumn } from 'src/widgets/BoardColumn/ui';
import { useIssuesByBoardId } from 'src/entities/board/api/useIssuesByBoardId';
import { STATUS_OPTIONS } from 'src/shared/constants/issueOptions';

//На этой странице приходится делать запрос на все борды и искать название и описание одной
//В реальном проекте, я бы доставал с эндпоинта который выдает данные одной доски
export const BoardPage = () => {
  const { id } = useParams<{ id: string }>();
  const boardId = Number(id);

  const { data: issuesData } = useIssuesByBoardId(boardId);
  const { data: boardsData } = useBoardsQuery();

  const currentBoard = boardsData?.find(board => board.id === boardId);

  const issuesWithBoardData = issuesData?.map(issue => ({
    ...issue,
    boardId: boardId,
    boardNameFix: currentBoard?.name,
  }));

  return (
    <div className="p-4 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">{currentBoard?.name}</h1>
      {currentBoard?.description && <p className="text-gray-500">{currentBoard.description}</p>}

      <div className="flex gap-4 overflow-x-auto">
        {STATUS_OPTIONS.map(({ value, label }) => (
          <BoardColumn
            key={value}
            title={label}
            issues={issuesWithBoardData?.filter(issue => issue.status === value) || []}
          />
        ))}
      </div>
    </div>
  );
};
