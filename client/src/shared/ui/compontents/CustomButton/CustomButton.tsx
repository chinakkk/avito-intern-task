import { ButtonHTMLAttributes, FC } from 'react';
import styles from './CustomButton.module.scss';

type CustomButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

export const CustomButton: FC<CustomButtonProps> = ({ label, ...props }) => {
  return (
    <button className={styles.button} {...props}>
      <span>{label}</span>
    </button>
  );
};
