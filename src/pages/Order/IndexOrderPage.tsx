import React, { useEffect, useState } from 'react';
import { Customer } from '../../models/Customer';
import { Order } from '../../models/Order';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Index from '../../components/Order/Index';

const IndexOrderPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');

  const fetchOrders = async () => {
    const res = await fetch('http://localhost:3001/orders');
    const data = await res.json();
    setOrders(data);
  };

  const fetchCustomers = async () => {
    const res = await fetch('http://localhost:3001/customers');
    const data = await res.json();
    setCustomers(data);
  };

  useEffect(() => {
    fetchOrders();
    fetchCustomers();
  }, []);

  return (
    <Header>
      <Navbar/>
      <Index orders={orders} customers={customers} selectedCustomerId={selectedCustomerId} />
    </Header>
  );
};

export default IndexOrderPage;