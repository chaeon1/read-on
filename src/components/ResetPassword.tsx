'use client';

import { useState } from 'react';
import { z } from 'zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '@/components/common/InputField';
import Button from '@/components/ui/Button';
import CheckIcon from '@/icons/CheckIcon';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../lib/firebase';

const resetSchema = z.object({
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),
});

type ResetForm = z.infer<typeof resetSchema>;

const ResetPassword = () => {
  const [submittedEmail, setSubmittedEmail] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetForm>({
    resolver: zodResolver(resetSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: ResetForm) => {
    try {
      await sendPasswordResetEmail(auth, data.email);
      setSubmittedEmail(data.email);
      console.log('비밀번호 재설정 이메일 전송 성공:', data.email);
    } catch (error) {
      console.error('비밀번호 재설정 이메일 전송 실패:', error);
    }
  };

  if (submittedEmail) {
    return (
      <div className="flex flex-col h-dvh">
        <div className="flex-1 pt-24">
          <div className="border flex-1 flex flex-col justify-center items-center text-center gap-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckIcon />
            </div>

            <div className="flex flex-col items-center gap-4">
              <h2 className="text-xl font-bold text-black">
                이메일을 확인하세요
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {submittedEmail}으로
                <br />
                비밀번호 재설정 링크를 보냈습니다.
                <br />
                이메일을 확인해 주세요.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <Link href="/signin" aria-label="Back to login">
              <Button>로그인으로 돌아가기</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-dvh">
      <div className="flex-1 pt-24">
        <div className="flex flex-col gap-8 mb-12">
          <h1 className="text-2xl font-bold text-black">비밀번호 찾기</h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            가입하신 이메일 주소를 입력하시면
            <br />
            비밀번호 재설정 링크를 보내드립니다.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <InputField
            id="email"
            label="이메일"
            {...register('email')}
            error={errors.email?.message}
            placeholder="name@email.com"
            type="email"
          />
        </div>

        <div className="flex justify-end items-baseline gap-2 my-2 mx-1">
          <Link href="/signin" aria-label="Back to login">
            <button className="text-sm text-gray-500">
              로그인으로 돌아가기
            </button>
          </Link>
        </div>

        <div className="mt-12">
          <Button type="submit" variant="primary" disabled={!isValid}>
            재설정 링크 보내기
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ResetPassword;
