import { CSSProperties, FC } from 'react';
import { Input } from 'antd';

type IssueSearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  style?: CSSProperties;
};

export const IssueSearchInput: FC<IssueSearchInputProps> = ({
  value,
  onChange,
  className,
  style,
}) => {
  return (
    <Input
      placeholder="Поиск по названию или исполнителю"
      value={value}
      onChange={event => onChange(event.target.value)}
      className={'mb-4 w-full max-w-md ' + className}
      style={style}
    />
  );
};
