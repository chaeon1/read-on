import '@/app/globals.css';
import Header from '@/components/Header';
import NavigationBar from '@/components/NavigationBar';
import BarsIcon from '@/icons/BarsIcon';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50 text-gray-900">
      <div className="flex flex-col min-h-screen px-6">
        <Header
          left={<h1 className="text-2xl font-bold">ReadOn</h1>}
          right={<BarsIcon />}
        />
        <main className="flex flex-col gap-8 py-18">{children}</main>
        <NavigationBar />
      </div>
    </div>
  );
}
