import { useState } from 'react';

export const useIssueFilters = () => {
  const [status, setStatus] = useState<string | null>(null);
  const [boardId, setBoardId] = useState<number | null>(null);

  return {
    filters: { status, boardId },
    setStatus,
    setBoardId,
  };
};
