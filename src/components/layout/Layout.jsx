import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children, onOpenDevis }) => {
  return (
    <div className="selection:bg-blue-500 selection:text-white">
      <Navbar onOpenDevis={onOpenDevis} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;