import { FC } from 'react';
import { Input } from 'antd';

type IssueSearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export const IssueSearchInput: FC<IssueSearchInputProps> = ({ value, onChange }) => {
  return (
    <Input
      placeholder="Поиск по названию или исполнителю"
      value={value}
      onChange={event => onChange(event.target.value)}
      className="mb-4 w-full max-w-md"
    />
  );
};
