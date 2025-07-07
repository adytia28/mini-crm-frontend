import React, { useEffect, useState } from 'react';
import { Customer } from '../../models/Customer';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Create from '../../components/Customer/Create';

const CreateCustomerPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

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
    fetchCustomers();
  }, []);

  return (
    <Header>
      <Navbar/>
      <Create onSuccess={fetchCustomers} />
    </Header>
  );
};

export default CreateCustomerPage;