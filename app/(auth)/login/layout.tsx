import React from 'react';

type Props = {
  children: React.ReactNode;
}
const Layout = ({
  children
}: Props) => {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      {children}
    </div>
  );
};

export default Layout;