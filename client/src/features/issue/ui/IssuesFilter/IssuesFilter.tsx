import { FC } from 'react';
import { Select } from 'antd';
import { STATUS_OPTIONS } from 'src/shared/constants/issueOptions';
import { BoardType } from 'src/entities/board/model/types/boardTypes';

type Props = {
  status: string | null;
  boardId: number | null;
  setStatus: (v: string | null) => void;
  setBoardId: (v: number | null) => void;
  boards: BoardType[];
};

export const IssuesFilter: FC<Props> = ({ status, boardId, setStatus, setBoardId, boards }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Select
        value={status ?? undefined}
        onChange={v => setStatus(v || null)}
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
        onChange={v => setBoardId(v || null)}
        placeholder="Фильтр по доске"
        allowClear
        style={{ width: 180 }}
        options={boards.map(board => ({
          value: board.id,
          label: board.name,
        }))}
      />
    </div>
  );
};
