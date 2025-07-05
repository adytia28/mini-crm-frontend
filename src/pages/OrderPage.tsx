import React, { useEffect, useState } from 'react';
import OrderForm from '../components/OrderForm';
import OrderList from '../components/OrderList';
import { Customer } from '../models/Customer';
import { Order } from '../models/Order';

const OrderPage: React.FC = () => {
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
    <div className="space-y-6">
      <OrderForm customers={customers} onSuccess={fetchOrders} />
      <OrderList orders={orders} selectedCustomerId={selectedCustomerId} />
    </div>
  );
};

export default OrderPage;