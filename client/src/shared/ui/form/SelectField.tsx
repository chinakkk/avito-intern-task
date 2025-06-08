import { Form, Select } from 'antd';
import { FC } from 'react';

type Option = { label: string; value: string | number };

type Props = {
  name: string;
  label: string;
  options: Option[];
  loading?: boolean;
  required?: boolean;
  placeholder?: string;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
};

export const SelectField: FC<Props> = ({
  name,
  label,
  options,
  loading,
  required = false,
  placeholder,
  onOpenChange,
  disabled,
}) => (
  <Form.Item
    name={name}
    label={label}
    rules={required ? [{ required: true, message: 'Поле обязательно' }] : undefined}
  >
    <Select
      placeholder={placeholder}
      loading={loading}
      onOpenChange={onOpenChange}
      disabled={disabled}
    >
      {options.map(option => (
        <Select.Option key={option.value} value={option.value}>
          {option.label}
        </Select.Option>
      ))}
    </Select>
  </Form.Item>
);
