import { FC } from 'react';
import { Form, Input, Select, Button } from 'antd';
import {
  CreateIssueType,
  useCreateIssueMutation,
} from 'src/features/issue/create/api/useCreateIssueMutation';
import { useUsersQuery } from 'src/entities/user/api/useUsersQuery';
import { UserType } from 'src/entities/user/model/types/userTypes';
import { useBoardsQuery } from 'src/entities/board/api/useBoardsQuery';
import { BoardType } from 'src/entities/board/model/types/boardTypes';
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from 'src/shared/constants/issueOptions';

type IssueFormProps = {
  defaultValues?: CreateIssueType;
};

const { TextArea } = Input;

export const IssueForm: FC<IssueFormProps> = ({ defaultValues }) => {
  const [form] = Form.useForm();
  const { mutate: createIssue, isPending: isCreatePending } = useCreateIssueMutation();
  const {
    data: boardsData,
    refetch: refetchBoards,
    isFetching: isBoardsFetching,
  } = useBoardsQuery();
  const { data: usersData, refetch: refetchUsers, isFetching: isUsersFetching } = useUsersQuery();
  const onSubmit = (values: CreateIssueType) => {
    createIssue(values, {
      onSuccess: () => {
        form.resetFields();
      },
    });
  };

  return (
    <Form form={form} layout="vertical" initialValues={defaultValues} onFinish={onSubmit}>
      <Form.Item
        name="title"
        label="Название задачи"
        rules={[{ required: true, message: 'Введите название' }]}
      >
        <Input placeholder="Введите название задачи" />
      </Form.Item>

      <Form.Item
        name="description"
        label="Описание задачи"
        rules={[{ required: true, message: 'Введите описание' }]}
      >
        <TextArea placeholder="Введите описание задачи" rows={4} />
      </Form.Item>

      <Form.Item
        name="boardId"
        label="Проект"
        rules={[{ required: true, message: 'Выберите проект' }]}
      >
        <Select
          placeholder="Выберите проект"
          loading={isBoardsFetching}
          onOpenChange={open => {
            if (open) refetchBoards();
          }}
          showSearch
          filterOption={(input, option) =>
            option?.children.toString()?.toLowerCase().includes(input.toLowerCase())
          }
        >
          {boardsData?.map((board: BoardType) => (
            <Select.Option key={board.id} value={board.id}>
              {board.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="priority" label="Приоритет">
        <Select placeholder="Выберите приоритет">
          {PRIORITY_OPTIONS.map(opt => (
            <Select.Option key={opt.value} value={opt.value}>
              {opt.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="status" label="Статус">
        <Select placeholder="Выберите статус">
          {STATUS_OPTIONS.map(opt => (
            <Select.Option key={opt.value} value={opt.value}>
              {opt.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="assigneeId"
        label="Исполнитель"
        rules={[{ required: true, message: 'Выберите исполнителя' }]}
      >
        <Select
          placeholder="Выберите исполнителя"
          loading={isUsersFetching}
          onOpenChange={open => {
            if (open) refetchUsers();
          }}
          showSearch
          filterOption={(input, option) =>
            option?.children.toString()?.toLowerCase().includes(input.toLowerCase())
          }
        >
          {usersData?.map((user: UserType) => (
            <Select.Option key={user.id} value={user.id}>
              {user.fullName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <div className={'flex justify-between'}>
        <Button type="default">Перейти на доску</Button>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isCreatePending}>
            Создать задачу
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};
