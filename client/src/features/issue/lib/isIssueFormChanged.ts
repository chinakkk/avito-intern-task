import { IssueType } from 'src/entities/issue/model/types/issueTypes';
import { CreateIssueType } from 'src/features/issue';

const shallowEqual = (a: Record<string, any>, b: Record<string, any>): boolean => {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;
  return aKeys.every(key => a[key] === b[key]);
};

export const isIssueFormChanged = (
  formValues: Partial<CreateIssueType> | undefined,
  selectedIssue: IssueType | undefined,
  isEditMode: boolean,
): boolean => {
  if (!isEditMode) return true;
  if (!selectedIssue) return false;

  const normalizedSelected = {
    boardId: selectedIssue.boardId,
    title: selectedIssue.title,
    description: selectedIssue.description,
    priority: selectedIssue.priority,
    status: selectedIssue.status,
    assigneeId: selectedIssue.assignee?.id,
  };

  return !shallowEqual(formValues ?? {}, normalizedSelected);
};
