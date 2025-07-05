import React from 'react';
import { Customer } from '../models/Customer';

interface Props {
  customers: Customer[];
  onSelect: (id: string) => void;
}

const CustomerList: React.FC<Props> = ({ customers, onSelect }) => {
  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-lg font-semibold mb-2">Daftar Customer</h2>
      {customers.length === 0 ? (
        <p className="text-gray-500">Belum ada customer.</p>
      ) : (
        <ul className="divide-y">
          {customers.map((cust) => (
            <li
              key={cust.id}
              className="py-2 cursor-pointer hover:bg-gray-100 px-2 rounded"
              onClick={() => onSelect(cust.id)}
            >
              <div className="font-medium">{cust.name}</div>
              <div className="text-sm text-gray-600">{cust.email} | {cust.phone}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomerList;