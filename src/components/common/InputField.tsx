import { forwardRef, InputHTMLAttributes } from 'react';
import Input from '@/components/ui/Input';
import clsx from 'clsx';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ id, label, error, ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={id} className="text-base font-medium text-black">
          {label}
        </label>
        <div className="relative">
          <Input ref={ref} id={id} {...rest} />
        </div>
        <p
          className={clsx(
            'text-sm min-h-5',
            error ? 'text-red-500' : 'text-transparent',
          )}
        >
          {error ?? ''}
        </p>
      </div>
    );
  },
);

InputField.displayName = 'InputField';

export default InputField;
