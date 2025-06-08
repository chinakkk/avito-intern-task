import { FC, memo, useEffect, useMemo } from 'react';
import { Form, Input, Select, Button } from 'antd';
import { useUsersQuery } from 'src/entities/user/api/useUsersQuery';
import { useBoardsQuery } from 'src/entities/board/api/useBoardsQuery';
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from 'src/shared/constants/issueOptions';
import { IssueType } from 'src/entities/issue/model/types/issueTypes';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from 'src/shared/config/routes';
import { isIssueFormChanged } from 'src/features/issue/lib/isIssueFormChanged';
import { SelectField } from 'src/shared/ui/form/SelectField';
import { useIssueFormSubmit } from 'src/features/issue/lib/useIssueFormSubmit';

const { TextArea } = Input;

type IssueFormProps = {
  selectedIssue?: IssueType;
};

export const IssueForm: FC<IssueFormProps> = memo(({ selectedIssue }) => {
  const navigate = useNavigate();
  const isEditMode = !!selectedIssue;
  const [form] = Form.useForm();
  const isBoardPage = !!useMatch(`${ROUTES.BOARD}/:id`);
  const isIssuePage = !!useMatch(`${ROUTES.ISSUES}`);
  const showBoardNavButton = isIssuePage && selectedIssue?.boardId;
  const { id } = useParams<{ id: string }>();
  const formValues = Form.useWatch([], form);

  const { handleSubmit, isPending } = useIssueFormSubmit({
    isEditMode,
    selectedIssue,
    resetForm: () => form.resetFields(),
  });

  const { data: boardsData, isFetching: isBoardsLoading } = useBoardsQuery();
  const { data: usersData, isFetching: isUsersLoading } = useUsersQuery();

  //Предзаполнение полей формы
  useEffect(() => {
    if (selectedIssue) {
      form.setFieldsValue({
        ...selectedIssue,
        assigneeId: selectedIssue.assignee?.id,
      });
    } else if (isBoardPage && id) {
      form.resetFields();
      form.setFieldsValue({ boardId: Number(id) });
    } else {
      form.resetFields();
    }
  }, [selectedIssue, form, isBoardPage, id]);

  //Проверка, редактировали ли данные
  const isChanged = useMemo(() => {
    return isIssueFormChanged(formValues, selectedIssue, isEditMode);
  }, [formValues, selectedIssue, isEditMode]);

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        name="title"
        label="Название"
        rules={[{ required: true, message: 'Поле обязательно' }]}
      >
        <Input placeholder="Введите название задачи" />
      </Form.Item>

      <Form.Item
        name="description"
        label="Описание"
        rules={[{ required: true, message: 'Поле обязательно' }]}
      >
        <TextArea placeholder="Введите описание" rows={3} />
      </Form.Item>

      <Form.Item
        name="boardId"
        label="Проект"
        rules={[{ required: true, message: 'Поле обязательно' }]}
      >
        <Select disabled={isBoardPage} placeholder="Выберите проект" loading={isBoardsLoading}>
          {boardsData?.map(board => (
            <Select.Option key={board.id} value={board.id}>
              {selectedIssue?.boardNameFix ?? board.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <SelectField
        name="priority"
        label="Приоритет"
        options={[...PRIORITY_OPTIONS]}
        placeholder="Выберите приоритет"
      />
      <SelectField
        name="status"
        label="Статус"
        options={[...STATUS_OPTIONS]}
        placeholder="Выберите статус"
      />
      <Form.Item
        name="assigneeId"
        label="Исполнитель"
        rules={[{ required: true, message: 'Поле обязательно' }]}
      >
        <Select placeholder="Выберите исполнителя" loading={isUsersLoading}>
          {usersData?.map(user => (
            <Select.Option key={user.id} value={user.id}>
              {user.fullName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <div className={`flex justify-between  ${!showBoardNavButton && 'justify-end'}`}>
        {showBoardNavButton && (
          <Button
            type="default"
            onClick={() => navigate(`${ROUTES.BOARD}/${selectedIssue?.boardId}`)}
          >
            Перейти на доску
          </Button>
        )}
        <Button disabled={!isChanged} type="primary" htmlType="submit" loading={isPending}>
          {isEditMode ? 'Сохранить' : 'Создать'}
        </Button>
      </div>
    </Form>
  );
});
