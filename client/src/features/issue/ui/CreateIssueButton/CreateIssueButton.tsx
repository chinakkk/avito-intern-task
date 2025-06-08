import { FC } from 'react';
import { useGlobalModal } from 'src/shared/lib/modal/GlobalModalContext';
import { IssueForm } from 'src/features/issue';
import { CustomButton } from 'src/shared/ui/compontents/CustomButton/CustomButton';

type CreateIssueButtonProps = {};

export const CreateIssueButton: FC<CreateIssueButtonProps> = () => {
  const { openModal } = useGlobalModal();
  const handleClick = () => {
    openModal({ title: 'Создание задачи', content: <IssueForm /> });
  };

  return <CustomButton onClick={handleClick} label={'Cоздать задачу'} />;
};
