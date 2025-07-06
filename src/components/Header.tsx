import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Header: React.FC<Props> = ({ children }) => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      {children}
    </div>
  );
};

export default Header;