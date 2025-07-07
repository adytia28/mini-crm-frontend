import React, { useEffect, useState } from 'react';
import { Customer } from '../../models/Customer';
import { Order } from '../../models/Order';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Index from '../../components/Order/Index';
import { useSearchParams } from 'react-router-dom';

const IndexOrderPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');

  const [searchParams] = useSearchParams();

  const fetchOrders = async (customerId?: string) => {
    const cached = localStorage.getItem('orders');

    if(cached) {
      setOrders(JSON.parse(cached));
    } else {
      let url = 'http://localhost:3001/orders';
    
      if (customerId) {
        url += `?customer_id=${customerId}`;
      }
    
      const res = await fetch(url);
      const data = await res.json();
  
      localStorage.setItem('orders', JSON.stringify(data));
      setOrders(data);
    }
  };

  const fetchCustomers = async () => {
    const cached = localStorage.getItem('customers');

    if(cached) {
      setCustomers(JSON.parse(cached));
    } else {
      const res = await fetch('http://localhost:3001/customers');
      const data = await res.json();
  
      localStorage.setItem('customers', JSON.stringify(data));
      setCustomers(data);
    }
  };

  useEffect(() => {
    const customerIdParam = searchParams.get('customer_id');

    if (customerIdParam) {
      setSelectedCustomerId(customerIdParam);
      fetchOrders(customerIdParam);
    } else {
      setSelectedCustomerId('');
      fetchOrders(); // ambil semua order
    }
  
  
    fetchCustomers();
  }, [searchParams]);

  return (
    <Header>
      <Navbar/>
      <Index orders={orders} customers={customers} selectedCustomerId={selectedCustomerId} />
    </Header>
  );
};

export default IndexOrderPage;