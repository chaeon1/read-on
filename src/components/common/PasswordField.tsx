import { forwardRef, InputHTMLAttributes, useState } from 'react';
import Input from '@/components/ui/Input';
import EyeIcon from '@/icons/EyeIcon';
import EyeSlashIcon from '@/icons/EyeSlashIcon';
import clsx from 'clsx';

interface PasswordFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
}

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ id, label, error, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="space-y-3">
        <label htmlFor={id} className="text-base font-medium text-black">
          {label}
        </label>
        <div className="relative">
          <Input
            ref={ref}
            id={id}
            type={showPassword ? 'text' : 'password'}
            {...rest}
            className="pr-10"
          />
          <button
            type="button"
            aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보이기'}
            className="absolute right-0 top-0 h-12 w-10"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
          </button>
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

PasswordField.displayName = 'PasswordField';

export default PasswordField;
