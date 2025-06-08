import { FC } from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

import { CreateIssueButton } from 'src/features/issue';
import { headerMenuItems } from 'src/shared/config/navigation';
import { getSelectedKey } from 'src/shared/lib/routing/getSelectedKey';

const { Header: AntHeader } = Layout;

export const Header: FC = () => {
  const location = useLocation();
  const selectedKey = getSelectedKey(location.pathname);

  return (
    <AntHeader
      style={{
        backgroundColor: '#BBD8F2',
      }}
      className="sticky top-0 z-50 flex justify-between items-center px-4 md:px-6"
    >
      <Menu
        className="flex-1"
        style={{ backgroundColor: 'transparent' }}
        mode="horizontal"
        selectedKeys={[selectedKey]}
        items={headerMenuItems.map(({ key, path, label }) => ({
          key,
          label: <Link to={path}>{label}</Link>,
        }))}
      />
      <CreateIssueButton />
    </AntHeader>
  );
};
