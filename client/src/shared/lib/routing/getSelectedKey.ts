import { matchPath } from 'react-router-dom';
import { headerMenuItems } from 'src/shared/config/navigation';

export const getSelectedKey = (pathname: string): string => {
  for (const item of headerMenuItems) {
    if (matchPath({ path: item.path, end: false }, pathname)) {
      return item.key;
    }
  }
  return '';
};
