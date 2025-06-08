import { IssueType } from 'src/entities/issue/model/types/issueTypes';

type Filters = {
  status: string | null;
  boardId: number | null;
};

export function filterIssues(issues: IssueType[], search: string, filters: Filters): IssueType[] {
  const lowerSearch = search.toLowerCase();

  return issues.filter(task => {
    const matchesTitle = task.title.toLowerCase().includes(lowerSearch);
    const matchesAssignee = task.assignee?.fullName?.toLowerCase().includes(lowerSearch);
    const matchesStatus = filters.status ? task.status === filters.status : true;
    const matchesBoard = filters.boardId ? task.boardId === filters.boardId : true;

    return (matchesTitle || matchesAssignee) && matchesStatus && matchesBoard;
  });
}
