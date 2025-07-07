import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

const Button = ({ variant = 'primary', className, ...props }: ButtonProps) => {
  const baseStyle =
    'w-full h-14 text-base font-medium rounded-lg transition-colors disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-black text-white hover:bg-gray-800',
    secondary: 'bg-gray-100 text-gray-400 hover:bg-gray-200',
    ghost: 'bg-transparent text-gray-500 hover:text-black',
  };

  return (
    <button
      {...props}
      className={clsx(baseStyle, variants[variant], className)}
    />
  );
};

export default Button;
