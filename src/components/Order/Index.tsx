import React from 'react';
import { Order } from '../../models/Order';
import { Customer } from '../../models/Customer';
import { Link } from 'react-router-dom';
import { formatTanggalIndonesia } from '../../util/format';

interface Props {
  orders: Order[];
  customers: Customer[];
  selectedCustomerId: string;
}

const Index: React.FC<Props> = ({ orders, customers, selectedCustomerId }) => {
  const filteredOrders = selectedCustomerId
    ? orders.filter(order => order.customer_id === selectedCustomerId)
    : orders;

  const filteredNameOrder = (customerId: string) => {
    const customer = customers.find((c) => c.id === customerId);
    return customer ? customer.name : 'Customer tidak ditemukan';
  };

  return (
    <div className="bg-white p-4 shadow rounded">
        <div className="flex align-center justify-between">
            <h2 className="text-lg font-semibold mb-2">Daftar Order</h2>
            <Link to="/orders/create" className="bg-blue-500 text-white flex align-center justify-center w-8 h-8 rounded-sm">
                 +
            </Link>
        </div>
        {filteredOrders.length === 0 ? (
            <p className="text-gray-500">Belum ada order untuk customer ini.</p>
        ) : (
            <ul className="divide-y">
            {filteredOrders.map(order => (
              <li key={order.id} className="py-2 px-2">
                <div className="font-medium">Order ID: {order.id}</div>
                 <div className="text-md font-600 text-slate-600 mt-4"> 
                   <Link to={`/orders/show/${order.customer_id}`}>{filteredNameOrder(order.customer_id)}</Link>
                  </div>
                <div className="text-md font-600 text-slate-600">Total: Rp {order.total_price.toLocaleString("ID")}</div>
                <div className="text-sm text-gray-600 pt-2">{formatTanggalIndonesia(order.created_at)}</div>
              </li>
            ))}
            </ul>
        )}
    </div>
  );
};

export default Index;