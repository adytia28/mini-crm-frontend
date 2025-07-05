import React, { useState } from 'react';

interface Props {
  onSuccess: () => void;
}

const CustomerForm: React.FC<Props> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3001/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone })
    });

    if (res.ok) {
      setName('');
      setEmail('');
      setPhone('');
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded space-y-4">
      <h2 className="text-lg font-semibold">Tambah Customer</h2>
      <input
        type="text"
        placeholder="Nama"
        className="w-full p-2 border rounded"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="No. HP"
        className="w-full p-2 border rounded"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Simpan
      </button>
    </form>
  );
};

export default CustomerForm;
