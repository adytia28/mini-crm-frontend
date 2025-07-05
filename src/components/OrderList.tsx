import React from 'react';
import { Order } from '../models/Order';

interface Props {
  orders: Order[];
  selectedCustomerId: string;
}

const OrderList: React.FC<Props> = ({ orders, selectedCustomerId }) => {
  const filteredOrders = selectedCustomerId
    ? orders.filter(order => order.customer_id === selectedCustomerId)
    : orders;

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-lg font-semibold mb-2">Daftar Order</h2>
      {filteredOrders.length === 0 ? (
        <p className="text-gray-500">Belum ada order untuk customer ini.</p>
      ) : (
        <ul className="divide-y">
          {filteredOrders.map(order => (
            <li key={order.id} className="py-2 px-2">
              <div className="font-medium">Order ID: {order.id}</div>
              <div className="text-sm text-gray-600">Item: {order.items.join(', ')}</div>
              <div className="text-sm text-gray-600">Total: Rp{order.total_price}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderList;