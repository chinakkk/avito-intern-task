import { ColumnsType } from 'antd/es/table';
import { IssueType } from '../model/types/issueTypes';
import { RenderPriorityTag, RenderStatusTag } from 'src/shared/lib/render/RenderTags';

export const getIssueColumns = ({
  onClick,
}: {
  onClick: (record: IssueType) => void;
}): ColumnsType<IssueType> => {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
    },
    {
      title: 'Название',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => <a onClick={() => onClick(record)}>{text}</a>,
    },
    {
      title: 'Приоритет',
      dataIndex: 'priority',
      key: 'priority',
      render: RenderPriorityTag,
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: RenderStatusTag,
    },
    {
      title: 'Исполнитель',
      dataIndex: ['assignee', 'fullName'],
      key: 'assignee',
    },
  ];
};
