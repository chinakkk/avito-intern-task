import { FC } from 'react';
import { Select } from 'antd';
import { STATUS_OPTIONS } from 'src/shared/constants/issueOptions';
import { BoardType } from 'src/entities/board/model/types/boardTypes';

type IssuesFilterProps = {
  status: string | null;
  boardId: number | null;
  setStatus: (value: string | null) => void;
  setBoardId: (value: number | null) => void;
  boards: BoardType[];
};

export const IssuesFilter: FC<IssuesFilterProps> = ({
  status,
  boardId,
  setStatus,
  setBoardId,
  boards,
}) => {
  return (
    <div className="flex gap-2 mb-4">
      <Select
        value={status ?? undefined}
        onChange={value => setStatus(value || null)}
        placeholder="Фильтр по статусу"
        allowClear
        style={{ width: 180 }}
        options={STATUS_OPTIONS.map(opt => ({
          value: opt.value,
          label: opt.label,
        }))}
      />
      <Select
        value={boardId ?? undefined}
        onChange={value => setBoardId(value || null)}
        placeholder="Фильтр по доске"
        allowClear
        style={{ width: 300 }}
        options={boards.map(board => ({
          value: board.id,
          label: board.name,
        }))}
      />
    </div>
  );
};
