import { Layout, Menu } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CreateIssueButton } from 'src/features/issue';

const { Header: AntHeader } = Layout;

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Определяем, какая вкладка активна
  const getSelectedKey = () => {
    if (location.pathname.startsWith('/issues')) return 'issues';
    if (location.pathname.startsWith('/boards')) return 'boards';
    return '';
  };

  return (
    <AntHeader
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#BBD8F2',
        padding: '0 24px',
      }}
    >
      <Menu
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          borderBottom: 'none',
        }}
        mode="horizontal"
        selectedKeys={[getSelectedKey()]}
      >
        <Menu.Item key="issues">
          <Link to="/issues">Все задачи</Link>
        </Menu.Item>
        <Menu.Item key="boards">
          <Link to="/boards">Проекты</Link>
        </Menu.Item>
      </Menu>

      <CreateIssueButton type={'create'} />
    </AntHeader>
  );
};
