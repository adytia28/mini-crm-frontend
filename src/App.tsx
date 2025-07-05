// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CustomerPage from './pages/CustomerPage';
import OrderPage from './pages/OrderPage';

function App() {
  return (
    <Router>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-6">Mini CRM Kuliner</h1>
        <nav className="flex justify-center gap-4 mb-6">
          <Link to="/customers" className="text-blue-500 hover:underline">Customers</Link>
          <Link to="/orders" className="text-blue-500 hover:underline">Orders</Link>
        </nav>
        <Routes>
          <Route path="/customers" element={<CustomerPage />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="*" element={<CustomerPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
