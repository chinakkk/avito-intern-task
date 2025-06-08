import { BoardCard } from 'src/entities/board/ui/BoardCard';
import { Skeleton, Empty } from 'antd';
import { useBoardsQuery } from 'src/entities/board/api/useBoardsQuery';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'src/shared/config/routes';

//Рендер таблиц

export const BoardList = () => {
  const { data } = useBoardsQuery();
  const navigate = useNavigate();

  if (!data?.length) return <Empty description="Нет досок" />;

  return (
    <div className="grid gap-4 sm:grid-cols-2 ">
      {data.map(board => (
        <BoardCard
          key={board.id}
          onClick={() => navigate(`${ROUTES.BOARD}/${board.id}`)}
          board={board}
        />
      ))}
    </div>
  );
};
