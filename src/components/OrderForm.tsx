import React, { useState } from 'react';
import { Customer } from '../models/Customer';

interface Props {
  customers: Customer[];
  onSuccess: () => void;
}

const OrderForm: React.FC<Props> = ({ customers, onSuccess }) => {
  const [customerId, setCustomerId] = useState('');
  const [items, setItems] = useState('');
  const [totalPrice, setTotalPrice] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3001/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer_id: customerId,
        items: items.split(',').map(i => i.trim()),
        total_price: parseFloat(totalPrice)
      })
    });

    if (res.ok) {
      setCustomerId('');
      setItems('');
      setTotalPrice('');
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded space-y-4">
      <h2 className="text-lg font-semibold">Tambah Order</h2>
      <select
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
        className="w-full border p-2 rounded"
        required
      >
        <option value="">Pilih Customer</option>
        {customers.map((cust) => (
          <option key={cust.id} value={cust.id}>{cust.name}</option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Item (pisahkan dengan koma)"
        className="w-full p-2 border rounded"
        value={items}
        onChange={e => setItems(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Total Harga"
        className="w-full p-2 border rounded"
        value={totalPrice}
        onChange={e => setTotalPrice(e.target.value)}
        required
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Simpan
      </button>
    </form>
  );
};

export default OrderForm;