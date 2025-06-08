import { Button, Modal } from 'antd';
import { FC } from 'react';
import { useGlobalModal } from 'src/shared/lib/modal/GlobalModalContext';
import { IssueForm } from 'src/features/issue';

type CreateIssueButtonProps = {};

export const CreateIssueButton: FC<CreateIssueButtonProps> = () => {
  const { openModal } = useGlobalModal();
  const handleClick = () => {
    openModal({ title: 'Создание задачи', content: <IssueForm /> });
  };

  return (
    <Button type="primary" onClick={handleClick}>
      Создать задачу
    </Button>
  );
};
