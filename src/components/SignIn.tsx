'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '@/components/common/InputField';
import PasswordField from '@/components/common/PasswordField';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { getFirebaseAuthErrorMessage } from '@/utils/firebaseErrorMessages';

const signInSchema = z.object({
  email: z
    .string({ required_error: '이메일을 입력해주세요.' })
    .min(1, '이메일을 입력해주세요.')
    .email('올바른 이메일 형식이 아닙니다.'),
  password: z
    .string({ required_error: '비밀번호를 입력해주세요.' })
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
});

type SignInForm = z.infer<typeof signInSchema>;

const SignIn = () => {
  const router = useRouter();
  const [formError, setFormError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: SignInForm) => {
    setFormError('');
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      router.push('/dashboard');
    } catch (error) {
      const message = getFirebaseAuthErrorMessage(error);
      setFormError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-dvh">
      <div className="flex-1 pt-24">
        <h1 className="text-2xl font-bold text-black mb-12">
          이메일로 로그인하기
        </h1>

        <div className="flex flex-col gap-4">
          <InputField
            id="email"
            label="이메일"
            {...register('email')}
            error={errors.email?.message}
            placeholder="name@email.com"
            type="email"
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
        </div>

        {formError && (
          <p className="text-sm text-red-500 mb-4 text-center">{formError}</p>
        )}

        <div className="flex justify-end items-baseline gap-2 my-2 mx-1">
          <Link href="/signup" aria-label="회원 가입 페이지로 이동">
            <button className="text-sm text-gray-500">회원 가입</button>
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/reset-password" aria-label="비밀번호 찾기 페이지로 이동">
            <button className="text-sm text-gray-500">비밀번호 찾기</button>
          </Link>
        </div>
      </div>

      <div className="sticky bottom-0 py-4 shadow-t">
        <Button
          type="submit"
          variant="primary"
          disabled={!isValid}
          aria-disabled={!isValid}
        >
          로그인
        </Button>
      </div>
    </form>
  );
};

export default SignIn;
