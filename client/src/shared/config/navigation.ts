import { ROUTES } from './routes';

export const headerMenuItems = [
  {
    key: 'issues',
    label: 'Все задачи',
    path: ROUTES.ISSUES,
  },
  {
    key: 'boards',
    label: 'Проекты',
    path: ROUTES.BOARDS,
  },
] as const;
