'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '@/components/common/InputField';
import PasswordField from '@/components/common/PasswordField';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { getFirebaseAuthErrorMessage } from '@/utils/firebaseErrorMessages';

const signUpSchema = z
  .object({
    email: z
      .string({ required_error: '이메일을 입력해주세요.' })
      .min(1, '이메일을 입력해주세요.')
      .email('올바른 이메일 형식이 아닙니다.'),
    password: z
      .string({ required_error: '비밀번호를 입력해주세요.' })
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

type SignUpForm = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const router = useRouter();
  const [formError, setFormError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: SignUpForm) => {
    setFormError('');
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      router.push('/signin');
    } catch (error) {
      const message = getFirebaseAuthErrorMessage(error);
      setFormError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-dvh">
      <div className="flex-1 pt-24">
        <h1 className="text-2xl font-bold text-black mb-12">
          이메일로 시작하기
        </h1>

        <div className="flex flex-col gap-4">
          <InputField
            id="email"
            label="이메일"
            {...register('email')}
            error={errors.email?.message}
            type="email"
            placeholder="name@email.com"
            aria-invalid={!!errors.email}
          />
          <PasswordField
            id="password"
            label="비밀번호"
            {...register('password')}
            error={errors.password?.message}
            placeholder="영문, 숫자, 특수문자 조합 8 - 12자리"
            aria-invalid={!!errors.password}
          />
          <PasswordField
            id="confirmPassword"
            label="비밀번호 확인"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
            placeholder="영문, 숫자, 특수문자 조합 8 - 12자리"
            aria-invalid={!!errors.confirmPassword}
          />
        </div>

        {formError && (
          <p className="text-sm text-red-500 mb-4 text-center">{formError}</p>
        )}
      </div>

      <div className="sticky bottom-0 py-4 shadow-t">
        <Button
          type="submit"
          variant="primary"
          disabled={!isValid}
          aria-disabled={!isValid}
        >
          가입하기
        </Button>
      </div>
    </form>
  );
};

export default SignUp;
