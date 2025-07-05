import React, { useEffect, useState } from 'react';
import CustomerForm from '../components/CustomerForm';
import CustomerList from '../components/CustomerList';
import { Customer } from '../models/Customer';

const CustomerPage: React.FC = () => {
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
    <div className="space-y-6">
      <CustomerForm onSuccess={fetchCustomers} />
      <CustomerList customers={customers} onSelect={setSelectedCustomerId} />
    </div>
  );
};

export default CustomerPage;