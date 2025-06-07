import { FC } from 'react';
import { Input } from 'antd';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const IssueSearchInput: FC<Props> = ({ value, onChange }) => {
  return (
    <Input
      placeholder="Поиск по названию или исполнителю"
      value={value}
      onChange={e => onChange(e.target.value)}
      className="mb-4 w-full max-w-md"
    />
  );
};
