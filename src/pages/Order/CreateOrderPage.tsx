import React, { useEffect, useState } from 'react';
import { Customer } from '../../models/Customer';
import { Order } from '../../models/Order';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Create from '../../components/Order/Create';

const CreateOrderPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const fetchOrders = async (customerId?: string) => {
    const cached = localStorage.getItem('orders');

    if(cached) {
      return JSON.parse(cached);
    } else {
      let url = 'http://localhost:3001/orders';
    
      if (customerId) {
        url += `?customer_id=${customerId}`;
      }
    
      const res = await fetch(url);
      const data = await res.json();
  
      localStorage.setItem('orders', JSON.stringify(data));
      return data;
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
    fetchOrders();
    fetchCustomers();
  }, []);

  return (
     <Header>
      <Navbar/>
      <Create customers={customers} onSuccess={fetchOrders} />
    </Header>
  );
};

export default CreateOrderPage;