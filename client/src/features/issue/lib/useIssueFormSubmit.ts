import { useGlobalModal } from 'src/shared/lib/modal/GlobalModalContext';
import { IssueType } from 'src/entities/issue/model/types/issueTypes';
import {
  CreateIssueType,
  useCreateIssueMutation,
  useUpdateIssueMutation,
} from 'src/features/issue';

interface UseIssueFormSubmitProps {
  isEditMode: boolean;
  selectedIssue?: IssueType;
  onSuccess?: () => void;
  resetForm: () => void;
}

export const useIssueFormSubmit = ({
  isEditMode,
  selectedIssue,
  onSuccess,
  resetForm,
}: UseIssueFormSubmitProps) => {
  const { closeModal } = useGlobalModal();
  const { mutate: createIssue, isPending: isCreating } = useCreateIssueMutation();
  const { mutate: updateIssue, isPending: isUpdating } = useUpdateIssueMutation();

  const handleSubmit = (issueValues: CreateIssueType) => {
    if (!isEditMode) {
      createIssue(issueValues, {
        onSuccess: () => {
          resetForm();
          onSuccess?.();
          closeModal();
        },
      });
    } else if (isEditMode && selectedIssue?.id) {
      updateIssue(
        { ...issueValues, id: selectedIssue.id },
        {
          onSuccess: () => {
            onSuccess?.();
            closeModal();
          },
        },
      );
    }
  };

  return {
    handleSubmit,
    isPending: isCreating || isUpdating,
  };
};
