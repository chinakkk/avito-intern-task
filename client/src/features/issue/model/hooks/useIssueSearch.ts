import { useState } from 'react';
import { useDebounce } from 'src/shared/lib/hooks/useDebounce';

export const useIssueSearch = (delay = 300) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, delay);

  return {
    searchTerm,
    debouncedSearchTerm,
    setSearchTerm,
  };
};
