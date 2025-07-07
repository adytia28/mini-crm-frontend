import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Show from '../../components/Order/Show';
import { Order } from '../../models/Order';

const ShowOrderPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { customerId } = useParams<{ customerId: string }>();
  const customerIdSafe = customerId!;

  const fetchOrders = async () => {
    const res = await fetch('http://localhost:3001/orders');
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
     <Header>
      <Navbar/>
      <Show orders={orders} customerId={customerIdSafe}/>
    </Header>
  );
};

export default ShowOrderPage;