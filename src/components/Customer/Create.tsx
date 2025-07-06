import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  onSuccess: () => void;
}

const Create: React.FC<Props> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const currentErrors: string[] = [];

    if (!name.trim()) {
      currentErrors.push('Name harus diisi.');
    }

    if (!email.trim()) {
       currentErrors.push('Email harus diisi.');
    }

    if (!phone.trim()) {
      currentErrors.push('Phone harus diisi.');
    } else if(!Number(phone)) {
      currentErrors.push('Phone harus berupa angka.');
    } else if(phone.length < 9) {
      currentErrors.push('Phone minimal 9 digit.');
    }

    if (currentErrors.length > 0) {
      setErrors(currentErrors);
      return;
    }

    setErrors([]);

    try {
      const res = await fetch('http://localhost:3001/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone })
      });

      if (res.ok) {
        setName('');
        setEmail('');
        setPhone('');
        setErrors([]);
        onSuccess();

        navigate('/customers');
      } else {
          const errorData = await res.json();
          setErrors([errorData.message]);
          return;
      }
    } catch (err) {
      setErrors(['Terjadi kesalahan jaringan.']);
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded space-y-4">
      <h2 className="text-lg font-semibold">Tambah Customer</h2>

      {errors.length > 0 && (
        <ul className="bg-red-100 border border-red-400 text-red-700 p-3 rounded">
          {errors.map((err, idx) => (
            <li key={idx}>• {err}</li>
          ))}
        </ul>
      )}

      <input
        type="text"
        placeholder="Nama"
        className="w-full p-2 border rounded"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="No. HP"
        className="w-full p-2 border rounded"
        value={phone}
        onChange={e => setPhone(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Simpan
      </button>
    </form>
  );
};

export default Create;
