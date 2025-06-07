import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { CreateIssueButton } from 'src/features/issue/ui';

const { Header: AntHeader } = Layout;

export const Header = () => {
  const location = useLocation();

  const getSelectedKey = () => {
    if (location.pathname.startsWith('/issues')) return 'issues';
    if (location.pathname.startsWith('/boards')) return 'boards';
    return '';
  };

  const menuItems = [
    {
      key: 'issues',
      label: <Link to="/issues">Все задачи</Link>,
    },
    {
      key: 'boards',
      label: <Link to="/boards">Проекты</Link>,
    },
  ];

  return (
    <AntHeader
      className="sticky top-0 z-50 flex justify-between items-center bg-[#BBD8F2] px-6"
      style={{
        backgroundColor: '#BBD8F2',
      }}
    >
      <Menu
        className="flex-1"
        style={{ backgroundColor: 'transparent' }}
        mode="horizontal"
        selectedKeys={[getSelectedKey()]}
        items={menuItems}
      />
      <CreateIssueButton type="create" />
    </AntHeader>
  );
};
