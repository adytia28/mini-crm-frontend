import React, { useEffect, useState } from 'react';
import { Order } from '../../models/Order';
import { Customer } from '../../models/Customer';
import { Link } from 'react-router-dom';
import { formatTanggalIndonesia } from '../../util/format';

interface Props {
  orders:Order[];
  customerId?: string;
}

const Show: React.FC<Props> = ({orders, customerId }) => {
   const [customerOrders, setCustomerOrders] = useState<Order[]>([]);

  const filterCustomerOrders = () => {
    const filterData = orders.filter((item) => {
      return item.customer_id === customerId;
    });

    setCustomerOrders(filterData);
  }

   useEffect(() => {
      filterCustomerOrders();
  }, []);

  return (
    <div>
      <h1>Detail Order</h1>
      <p>Customer ID: {customerId}</p>
       <ul>
        {customerOrders.map((order) => (
          <li key={order.id}>Order ID: {order.id} - {order.total_price}</li>
        ))}
      </ul>
    </div>
  );
};

export default Show;