'use client';

import '@/app/globals.css';
import Header from '@/components/Header';
import AngleLeftIcon from '@/icons/AngleLeftIcon';
import { useRouter } from 'next/navigation';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="bg-gray-50 text-gray-900">
      <div className="flex flex-col min-h-screen px-6">
        <Header
          left={
            <button onClick={handleBack} aria-label="">
              <AngleLeftIcon />
            </button>
          }
        />
        <main className="flex flex-col gap-8">{children}</main>
      </div>
    </div>
  );
}
