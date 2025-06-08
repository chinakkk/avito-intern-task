import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export const FloatingActionButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      type="primary"
      shape="circle"
      icon={<PlusOutlined />}
      size="large"
      onClick={onClick}
      className="!fixed right-6 bottom-6 z-50 shadow-lg !bg-[#3875f6]"
    />
  );
};
