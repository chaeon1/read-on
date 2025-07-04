interface HeaderProps {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

const Header = ({ left, center, right }: HeaderProps) => {
  return (
    <div>
      <header className="flex items-center justify-between fixed top-0 left-0 right-0 p-4 bg-white shadow-xs z-10">
        <div className="flex items-center gap-4">{left}</div>
        <div className="flex-1 text-center">{center}</div>
        <div className="flex items-center gap-4">{right}</div>
      </header>
    </div>
  );
};

export default Header;
