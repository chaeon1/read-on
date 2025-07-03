import Header from '@/components/Header';
import './globals.css';
import NavigationBar from '@/components/NavigationBar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <title>ReadOn</title>
      </head>
      <body className="bg-gray-50 text-gray-900">
        <div className="flex flex-col min-h-screen px-6">
          <Header />
          <main className="flex flex-col gap-8 py-18">{children}</main>
          <NavigationBar />
        </div>
      </body>
    </html>
  );
}
