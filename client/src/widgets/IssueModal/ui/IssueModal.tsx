import { Modal } from 'antd';
import {
  useModalIssuesState,
  useModalIssuesActions,
} from 'src/entities/modal/model/modalIssuesSlice';
import { FC } from 'react';
import { IssueForm } from 'src/features/issue';

export const IssueModal: FC = () => {
  const { isOpen, type, taskId } = useModalIssuesState();
  const { closeModal } = useModalIssuesActions();

  return (
    <Modal
      open={isOpen}
      onCancel={() => closeModal()}
      footer={null}
      title={type === 'create' ? 'Создать задачу' : 'Просмотр задачи'}
    >
      <IssueForm />
    </Modal>
  );
};
