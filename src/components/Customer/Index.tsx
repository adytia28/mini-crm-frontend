import React, { useState } from 'react';
import { Customer } from '../../models/Customer';
import { Link } from 'react-router-dom';
import { formatTanggalIndonesia } from '../../util/format';

interface Props {
  customers: Customer[];
  onSelect: (id: string) => void;
}

const Index: React.FC<Props> = ({ customers, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCustomers = customers.filter((cust) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      cust.name.toLowerCase().includes(lowerSearch) ||
      cust.email.toLowerCase().includes(lowerSearch)
    );
  });

  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="flex justify-between align-center">
        <h2 className="mb-2 text-lg font-semibold">Daftar Customer</h2>
        <Link to="/customers/create" className="flex justify-center w-8 h-8 text-white bg-blue-500 rounded-sm align-center">
              +
        </Link>
      </div>

      <div className="pb-4 bg-white ">
        <div className="relative flex items-center justify-start mt-1">
          <div className="absolute inset-y-0 flex items-center justify-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            placeholder="Search for name, email"
            className="block px-10 py-4 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>


      <table className="w-full mt-4 text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3">Phone</th>
            <th scope="col" className="px-6 py-3">Join Date</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-center text-gray-500">Belum ada customer.</td>
            </tr>
          ) : (
            filteredCustomers.map((cust) => (
              <tr key={cust.id} className="bg-white border-b hover:bg-gray-50 ">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">{cust.name}</td>
                <td className="px-6 py-4">{cust.email}</td>
                <td className="px-6 py-4">{cust.phone}</td>
                <td className="px-6 py-4">{formatTanggalIndonesia(cust.created_at)}</td>
                <td className="px-6 py-4">
                  <Link to={`/orders?customer_id=${cust.id}`} className="text-blue-500 hover:underline">Lihat Order</Link>
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