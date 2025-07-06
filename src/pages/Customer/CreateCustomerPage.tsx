import React, { useEffect, useState } from 'react';
import { Customer } from '../../models/Customer';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Create from '../../components/Customer/Create';

const CreateCustomerPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

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
      <Create onSuccess={fetchCustomers} />
    </Header>
  );
};

export default CreateCustomerPage;