import { FC, useEffect, useMemo } from 'react';
import { Form, Input, Select, Button } from 'antd';
import { useUsersQuery } from 'src/entities/user/api/useUsersQuery';
import { useBoardsQuery } from 'src/entities/board/api/useBoardsQuery';
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from 'src/shared/constants/issueOptions';
import {
  CreateIssueType,
  useCreateIssueMutation,
} from 'src/features/issue/api/useCreateIssueMutation';
import { IssueType } from 'src/entities/issue/model/types/issueTypes';
import { useUpdateIssueMutation } from 'src/features/issue';
import { useNavigate } from 'react-router-dom';
import { useModalIssuesActions } from 'src/entities/modal/model/modalIssuesSlice';

const { TextArea } = Input;

type IssueFormProps = {
  selectedIssue?: IssueType;
  type: 'create' | 'view';
  onSuccess?: () => void;
};

export const IssueForm: FC<IssueFormProps> = ({ selectedIssue, type, onSuccess }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { closeModal } = useModalIssuesActions();

  const { mutate: createIssue, isPending: isCreating } = useCreateIssueMutation();
  const { mutate: updateIssue, isPending: isUpdating } = useUpdateIssueMutation();

  const {
    data: boardsData,
    isFetching: isBoardsLoading,
    refetch: refetchBoards,
  } = useBoardsQuery();
  const { data: usersData, isFetching: isUsersLoading, refetch: refetchUsers } = useUsersQuery();

  const onSubmit = (issueValues: CreateIssueType) => {
    if (type === 'create') {
      createIssue(issueValues, {
        onSuccess: () => {
          form.resetFields();
          onSuccess?.();
        },
      });
      closeModal();
    } else if (type === 'view' && selectedIssue?.id) {
      updateIssue(
        { ...issueValues, id: selectedIssue.id },
        {
          onSuccess: () => {
            onSuccess?.();
          },
        },
      );
      closeModal();
    }
  };
  useEffect(() => {
    if (selectedIssue) {
      form.setFieldsValue({
        ...selectedIssue,
        assigneeId: selectedIssue.assignee?.id,
      });
    } else {
      form.resetFields();
    }
  }, [selectedIssue, form]);

  const formValues = Form.useWatch([], form);

  const shallowEqual = (a: Record<string, any>, b: Record<string, any>) => {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;

    return aKeys.every(key => a[key] === b[key]);
  };

  const isChanged = useMemo(() => {
    if (type === 'create') return true;
    if (!selectedIssue) return false;

    const normalizedSelectedIssue = {
      boardId: selectedIssue.boardId,
      title: selectedIssue.title,
      description: selectedIssue.description,
      priority: selectedIssue.priority,
      status: selectedIssue.status,
      assigneeId: selectedIssue.assignee?.id,
    };

    return !shallowEqual(formValues ?? {}, normalizedSelectedIssue);
  }, [formValues, selectedIssue, type]);

  return (
    <Form form={form} layout="vertical" onFinish={onSubmit}>
      <Form.Item name="title" label="Название" rules={[{ required: true }]}>
        <Input placeholder="Введите название задачи" />
      </Form.Item>

      <Form.Item name="description" label="Описание" rules={[{ required: true }]}>
        <TextArea placeholder="Введите описание" rows={3} />
      </Form.Item>

      <Form.Item name="boardId" label="Проект" rules={[{ required: true }]}>
        <Select
          onOpenChange={open => open && refetchBoards()}
          disabled={!!selectedIssue?.boardNameFix}
          placeholder="Выберите проект"
          loading={isBoardsLoading}
        >
          {boardsData?.map(board => (
            <Select.Option key={board.id} value={board.id}>
              {selectedIssue?.boardNameFix ?? board.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="priority" label="Приоритет" rules={[{ required: true }]}>
        <Select placeholder="Выберите приоритет">
          {PRIORITY_OPTIONS.map(opt => (
            <Select.Option key={opt.value} value={opt.value}>
              {opt.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="status" label="Статус" rules={[{ required: true }]}>
        <Select placeholder="Выберите статус">
          {STATUS_OPTIONS.map(opt => (
            <Select.Option key={opt.value} value={opt.value}>
              {opt.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="assigneeId" label="Исполнитель" rules={[{ required: true }]}>
        <Select
          onOpenChange={open => open && refetchUsers()}
          placeholder="Выберите исполнителя"
          loading={isUsersLoading}
        >
          {usersData?.map(user => (
            <Select.Option key={user.id} value={user.id}>
              {user.fullName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <div className="flex justify-between">
        <Button type="default" onClick={() => navigate(`board/${selectedIssue?.boardId}`)}>
          Перейти на доску
        </Button>
        <Button
          disabled={!isChanged}
          type="primary"
          htmlType="submit"
          loading={isCreating || isUpdating}
        >
          {type === 'create' ? 'Создать' : 'Сохранить'}
        </Button>
      </div>
    </Form>
  );
};
