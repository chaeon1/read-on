import type { Book } from '@/types/book';

interface BookCardProps {
  book: Book;
  onClick?: () => void;
}

export function BookCard({ book, onClick }: BookCardProps) {
  return (
    <div
      className="group flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 cursor-pointer"
      onClick={onClick}
    >
      <div className={`w-21 h-28 rounded-md ${book.cover}`}></div>

      <div className="max-h-24 flex-1">
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-semibold truncate">{book.title}</h3>
          <p className="text-sm text-gray-500 truncate">{book.authors}</p>
        </div>

        <div className="flex flex-col items-end gap-1">
          <span className="text-xl font-semibold tabular-nums">
            {book.progress}%
          </span>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${book.progress}%` }}
            ></div>
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <span className="text-xs text-gray-400">
            {book.lastRead.toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
