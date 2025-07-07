'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '@/components/common/InputField';
import PasswordField from '@/components/common/PasswordField';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';

const signUpSchema = z
  .object({
    email: z.string().email('올바른 이메일 형식이 아닙니다.'),
    password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

type SignUpForm = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: SignUpForm) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      console.log('회원 가입 성공:', data);
      router.push('/signin');
    } catch (error) {
      console.error('회원 가입 실패:', error);
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
          />
          <PasswordField
            id="password"
            label="비밀번호"
            {...register('password')}
            error={errors.password?.message}
            placeholder="영문, 숫자, 특수문자 조합 8 - 12자리"
          />
          <PasswordField
            id="confirmPassword"
            label="비밀번호 확인"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
            placeholder="영문, 숫자, 특수문자 조합 8 - 12자리"
          />
        </div>
      </div>

      <div className="sticky bottom-0 py-4 shadow-t">
        <Button type="submit" variant="secondary" disabled={!isValid}>
          가입하기
        </Button>
      </div>
    </form>
  );
};

export default SignUp;
