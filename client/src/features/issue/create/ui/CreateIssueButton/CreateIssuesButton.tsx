import { Button } from 'antd';
import { useModalIssuesActions } from 'src/entities/modal/model/modalIssuesSlice';
import { FC } from 'react';

type CreateIssueButtonProps = {
  type: 'view' | 'create';
  taskId?: string;
};

export const CreateIssueButton: FC<CreateIssueButtonProps> = ({ type, taskId }) => {
  const { openModal } = useModalIssuesActions();

  const handleClick = () => {
    openModal({ type });
  };

  return (
    <Button type="primary" onClick={handleClick}>
      Создать задачу
    </Button>
  );
};
