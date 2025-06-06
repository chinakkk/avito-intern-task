import { Modal } from 'antd';
import {
  useModalIssuesState,
  useModalIssuesActions,
} from 'src/entities/modal/model/modalIssuesSlice';
import { FC } from 'react';

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
      {type === 'create' ? (
        <div>Тут будет форма создания</div>
      ) : (
        <div>Тут будет просмотр задачи (ID: {taskId})</div>
      )}
    </Modal>
  );
};
