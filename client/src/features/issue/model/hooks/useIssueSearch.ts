import { useState } from 'react';
import { useDebounce } from 'src/shared/lib/hooks/useDebounce';

export const useIssueSearch = (delay = 300) => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, delay);

  return {
    search,
    debouncedSearch,
    setSearch,
  };
};
