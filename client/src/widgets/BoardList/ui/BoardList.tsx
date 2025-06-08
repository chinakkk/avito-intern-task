import { Empty, Table } from 'antd';
import { useBoardsQuery } from 'src/entities/board/api/useBoardsQuery';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'src/shared/config/routes';
import { ColumnsType } from 'antd/es/table';
import { BoardType } from 'src/entities/board/model/types/boardTypes';

//Рендер таблиц

export const BoardList = () => {
  const { data: boardsData } = useBoardsQuery();
  const navigate = useNavigate();

  if (!boardsData?.length) return <Empty description="Нет досок" />;
  const columns: ColumnsType<BoardType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <a onClick={() => navigate(`${ROUTES.BOARD}/${record.id}`)}>{text}</a>
      ),
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Задачи',
      dataIndex: 'taskCount',
      key: 'taskCount',
      align: 'center',
    },
  ];

  return <Table rowKey="id" columns={columns} dataSource={boardsData} pagination={false} />;
};
