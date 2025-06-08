import { FC, ReactNode } from 'react';
import styles from './PageLayout.module.scss';

export const PageLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
