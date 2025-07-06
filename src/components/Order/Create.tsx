import React, { useState } from 'react';
import { Customer } from '../../models/Customer';
import { useNavigate } from 'react-router-dom';

interface Props {
  customers: Customer[];
  onSuccess: () => void;
}

interface Item {
  name: string;
  qty:number;
  price: number;
  total:number;
}

const Create: React.FC<Props> = ({ customers, onSuccess }) => {
  const [customerId, setCustomerId] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [itemQty, setItemQty] = useState('');
  const navigate = useNavigate();
  
  const addItem = () => {
    if (!itemName || !itemPrice || !itemQty) return;

    const price = parseFloat(itemPrice);
    const qty = parseInt(itemQty);
    const total = price * qty;

    setItems([
      ...items,
      { name: itemName, qty, price, total }
    ]);

    setItemName('');
    setItemPrice('');
    setItemQty('');
  };



  const totalPrice = items.reduce((sum, item) => sum + item.total, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const currentErrors: string[] = [];

    if (!customerId) {
      currentErrors.push('Customer harus dipilih.');
    }

    if (items.length === 0) {
      currentErrors.push('Minimal 1 item harus ditambahkan.');
    }

    if (currentErrors.length > 0) {
      setErrors(currentErrors);
      return;
    }

    setErrors([]);

    try {
       if (items.length === 0 || !customerId) return;

        const total_price = items.reduce((sum, item) => sum + item.total, 0);

        const payload = {
          customer_id: customerId, // pastikan ini state atau input
          items,
          total_price
        };

        const res = await fetch('http://localhost:3001/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
    
        if (res.ok) {
          setCustomerId('');
          setItems([]);
          setErrors([]);
          onSuccess();

          navigate('/orders');
        } else {
            const errorData = await res.json(); // baca message dari backend
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
      <h2 className="text-lg font-semibold">Tambah Order</h2>

      {errors.length > 0 && (
        <ul className="bg-red-100 border border-red-400 text-red-700 p-3 rounded">
          {errors.map((err, idx) => (
            <li key={idx}>• {err}</li>
          ))}
        </ul>
      )}

      <select
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
        className="w-full border p-2 rounded"
      >
        <option value="">Pilih Customer</option>
        {customers.map((cust) => (
          <option key={cust.id} value={cust.id}>{cust.name}</option>
        ))}
      </select>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Nama Item"
          className="flex-1 border p-2 rounded"
          value={itemName}
          onChange={e => setItemName(e.target.value)}
        />
         <input value={itemQty} 
          onChange={e => setItemQty(e.target.value)} 
          placeholder="Jumlah item" 
          type="number"   
          className="w-32 border p-2 rounded" 
        />
        <input
          type="number"
          placeholder="Harga"
          className="w-32 border p-2 rounded"
          value={itemPrice}
          onChange={e => setItemPrice(e.target.value)}
        />
        <button
          type="button"
          onClick={addItem}
          className="bg-gray-500 text-white px-4 rounded"
        >
          +
        </button>
      </div>

      <div className="bg-gray-50 p-2 rounded">
        <h3 className="font-semibold mb-1">Daftar Item</h3>
        {items.length === 0 ? (
          <p className="text-sm text-gray-500">Belum ada item.</p>
        ) : (
          <ul className="text-sm space-y-1">
            <table className="table-auto w-full my-4">
              <thead>
                <tr>
                  <th className="text-left w-25">Name</th>
                  <th className="text-left w-25">Quantity</th>
                  <th className="text-left w-25">Price</th>
                  <th className="text-left w-25">Total Item</th>
                </tr>
              </thead>
              <tbody className="w-full">
                {items.map((item, index) => (
                <tr key={index}>
                  <td className="w-25">{item.name}</td>
                  <td className="w-25">{item.qty}</td>
                  <td className="w-25">Rp {item.price.toLocaleString("ID")}</td>
                  <td className="w-25">Rp {item.total.toLocaleString("ID")}</td>
                </tr>
                ))}
              </tbody>
            </table>
          </ul>
        )}
        <div className="mt-2 font-bold mt-4">Total: Rp{totalPrice.toLocaleString("ID")}</div>
      </div>

      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Simpan Order
      </button>
    </form>
  );
};

export default Create;
