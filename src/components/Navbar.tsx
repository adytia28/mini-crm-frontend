import React from 'react';
import { Link } from 'react-router-dom';


const Navbar: React.FC = () => {
  return (
    <>
        <h1 className="text-2xl font-bold text-center mb-6">Mini CRM Kuliner</h1>
        <nav className="flex justify-center gap-4 mb-6">
          <Link to="/customers" className="text-blue-500 hover:underline">Customers</Link>
          <Link to="/orders" className="text-blue-500 hover:underline">Orders</Link>
        </nav>
    </>
  );
};

export default Navbar;