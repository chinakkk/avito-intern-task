import { FC } from 'react';
import { Card, Typography, Badge, Divider } from 'antd';
import { BoardType } from 'src/entities/board/model/types/boardTypes';

interface BoardCardProps {
  board: BoardType;
  onClick?: () => void;
}

export const BoardCard: FC<BoardCardProps> = ({ board, onClick }) => {
  return (
    <Card onClick={onClick} hoverable className="transition-shadow duration-200 hover:shadow-md">
      <div className="flex justify-between items-start">
        <Typography.Title level={5} className="!mb-0 !text-base">
          {board.name}
        </Typography.Title>
        <Badge count={board.taskCount} title="Кол-во задач" />
      </div>

      <Divider />

      {board.description && (
        <Typography.Paragraph type="secondary" ellipsis={{ rows: 2 }} className="!mb-0 !text-sm">
          {board.description}
        </Typography.Paragraph>
      )}
    </Card>
  );
};
