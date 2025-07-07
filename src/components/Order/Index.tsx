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
    <div className="p-4 bg-white rounded shadow">
        <div className="flex justify-between align-center">
            <h2 className="mb-2 text-lg font-semibold">Daftar Order</h2>
            <Link to="/orders/create" className="flex justify-center w-8 h-8 text-white bg-blue-500 rounded-sm align-center">
                 +
            </Link>
        </div>
        
        <table className="w-full mt-4 text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">Order Id</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Detail Order</th>
              <th scope="col" className="px-6 py-3">Total Order</th>
              <th scope="col" className="px-6 py-3">Created At</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  Belum ada order untuk customer ini.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{order.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {filteredNameOrder(order.customer_id)}
                  </td>
                  <td className="px-6 py-4">
                    <ul>
                      {order.items.map((item, idx) => (
                        <li key={`${order.id}-${idx}`} className="space-y-1 whitespace-nowrap">
                            {idx + 1}. {item.name} x {item.qty} = Rp {(item.price * item.qty).toLocaleString('id-ID')}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4">
                    {order.total_price.toLocaleString("ID")}
                  </td>
                  <td className="px-6 py-4">
                    {formatTanggalIndonesia(order.created_at)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
    </div>
  );
};

export default Index;