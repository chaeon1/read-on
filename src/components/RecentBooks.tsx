'use client';

import { useState } from 'react';
import { BookCard } from '@/components/BookCard';
import type { Book } from '@/types/book';
import AngleDownIcon from '@/icons/AngleDownIcon';

const mockBooks: Book[] = [
  {
    id: '1',
    title: '책 제목',
    authors: '저자',
    progress: 65,
    cover: 'bg-gradient-to-br from-blue-500 to-blue-600',
    lastRead: new Date(),
  },
  {
    id: '2',
    title: '두 번째 책 제목',
    authors: '두 번째 저자',
    progress: 45,
    cover: 'bg-gradient-to-br from-green-500 to-green-600',
    lastRead: new Date(),
  },
  {
    id: '3',
    title: '세 번째 책 제목',
    authors: '세 번째 저자',
    progress: 80,
    cover: 'bg-gradient-to-br from-purple-500 to-purple-600',
    lastRead: new Date(),
  },
  {
    id: '4',
    title: '네 번째 책 제목',
    authors: '네 번째 저자',
    progress: 30,
    cover: 'bg-gradient-to-br from-red-500 to-red-600',
    lastRead: new Date(),
  },
  {
    id: '5',
    title: '다섯 번째 책 제목',
    authors: '다섯 번째 저자',
    progress: 90,
    cover: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
    lastRead: new Date(),
  },
  {
    id: '6',
    title: '여섯 번째 책 제목',
    authors: '여섯 번째 저자',
    progress: 20,
    cover: 'bg-gradient-to-br from-pink-500 to-pink-600',
    lastRead: new Date(),
  },
  {
    id: '7',
    title: '일곱 번째 책 제목',
    authors: '일곱 번째 저자',
    progress: 75,
    cover: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
    lastRead: new Date(),
  },
  {
    id: '8',
    title: '여덟 번째 책 제목',
    authors: '여덟 번째 저자',
    progress: 55,
    cover: 'bg-gradient-to-br from-teal-500 to-teal-600',
    lastRead: new Date(),
  },
];

const RecentBooks = () => {
  const [books] = useState<Book[]>(mockBooks);
  const [visibleCount, setVisibleCount] = useState(3);
  const visibleBooks = books.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, books.length));
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-bold text-gray-900 mb-4">최근 읽은 책</h2>
      <div>
        {visibleBooks.map((book, index) => (
          <div key={book.id}>
            <BookCard
              book={book}
              onClick={() => console.log(`Opening book: ${book.title}`)}
            />
            {index < books.length - 1 && (
              <hr className="border-gray-200 my-2" />
            )}
          </div>
        ))}
      </div>
      {visibleCount < books.length && (
        <button
          onClick={handleLoadMore}
          className="flex items-center justify-center py-2 mt-4 rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          <AngleDownIcon />
        </button>
      )}
    </div>
  );
};

export default RecentBooks;
