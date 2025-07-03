'use client';

import ChartPieIcon from '@/icons/ChartPieIcon';
import HomeIcon from '@/icons/HomeIcon';
import ShareNodesIcon from '@/icons/ShareNodesIcon';
import Link from 'next/link';

export default function NavigationBar() {
  return (
    <nav className="bg-gray-200 flex items-center justify-around fixed bottom-0 left-0 right-0 p-4 z-10">
      <Link href="/stats" aria-label="Statistics" className="text-gray-700">
        <ChartPieIcon />
      </Link>

      <Link href="/home" aria-label="Home" className="text-gray-700">
        <HomeIcon />
      </Link>

      <Link href="/share" aria-label="Share" className="text-gray-700">
        <ShareNodesIcon />
      </Link>
    </nav>
  );
}
