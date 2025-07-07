import { forwardRef, InputHTMLAttributes } from 'react';
import clsx from 'clsx';

const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className={clsx(
        'h-12 w-full text-base border-b border-gray-300 bg-transparent px-0 focus:outline-none placeholder:text-gray-400',
        className,
      )}
    />
  );
});

Input.displayName = 'Input';

export default Input;
