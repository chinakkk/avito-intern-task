import { Button, Layout, Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const { Header: AntHeader } = Layout;

export const Header = () => {
  const navigate = useNavigate();

  return (
    <AntHeader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Menu theme="dark" mode="horizontal" selectable={false} style={{ flex: 1 }}>
        <Menu.Item key="issues">
          <Link to="/issues">Все задачи</Link>
        </Menu.Item>
        <Menu.Item key="boards">
          <Link to="/boards">Проекты</Link>
        </Menu.Item>
      </Menu>

      <Button type="primary" onClick={() => navigate('/issues?create=true')}>
        Создать задачу
      </Button>
    </AntHeader>
  );
};
