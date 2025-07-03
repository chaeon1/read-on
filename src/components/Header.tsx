import BarsIcon from '@/icons/BarsIcon';

const Header = () => {
  return (
    <div>
      <header className="flex items-center justify-between fixed top-0 left-0 right-0 p-4 bg-white shadow-xs z-10">
        <h1 className="text-2xl font-bold">ReadOn</h1>
        <button className="rounded-md">
          <BarsIcon />
        </button>
      </header>
    </div>
  );
};

export default Header;
