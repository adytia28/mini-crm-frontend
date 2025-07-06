import React, { useEffect, useState } from 'react';
import { Customer } from '../../models/Customer';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Index from '../../components/Customer/Index';

const IndexCustomerPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');

  const fetchCustomers = async () => {
    const res = await fetch('http://localhost:3001/customers');
    const data = await res.json();
    setCustomers(data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <Header>
      <Navbar/>
      <Index customers={customers} onSelect={setSelectedCustomerId} />
    </Header>
  );
};

export default IndexCustomerPage;