import { BoardCard } from 'src/entities/board/ui/BoardCard';
import { Skeleton, Empty } from 'antd';
import { useBoardsQuery } from 'src/entities/board/api/useBoardsQuery';

export const BoardList = () => {
  const { data, isLoading, isError } = useBoardsQuery();

  if (isLoading) return <Skeleton active />;
  if (isError) return <div className="text-red-500">Ошибка при загрузке досок</div>;
  if (!data?.length) return <Empty description="Нет досок" />;

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data.map(board => (
        <BoardCard key={board.id} board={board} />
      ))}
    </div>
  );
};
