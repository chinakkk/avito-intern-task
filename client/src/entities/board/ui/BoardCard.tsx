import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Card, Typography, Badge } from 'antd';
import { BoardType } from 'src/entities/board/model/types/boardTypes';

interface BoardCardProps {
  board: BoardType;
}

export const BoardCard: FC<BoardCardProps> = ({ board }) => {
  return (
    <Link to={`/board/${board.id}`}>
      <Card hoverable className="transition-shadow duration-200 hover:shadow-md">
        <div className="flex justify-between items-start mb-1">
          <Typography.Title level={5} className="!mb-0">
            {board.name}
          </Typography.Title>
          <Badge count={board.taskCount} title="Кол-во задач" />
        </div>

        {board.description && (
          <Typography.Paragraph type="secondary" ellipsis={{ rows: 2 }}>
            {board.description}
          </Typography.Paragraph>
        )}
      </Card>
    </Link>
  );
};
