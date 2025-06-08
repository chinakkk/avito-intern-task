import { Typography } from 'antd';

export const PageTitle = ({ title }: { title: string }) => (
  <Typography.Title level={3} className="mb-4 w-full">
    {title}
  </Typography.Title>
);
