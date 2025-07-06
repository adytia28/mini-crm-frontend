import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateCustomerPage from './pages/Customer/CreateCustomerPage';
import IndexCustomerPage from './pages/Customer/IndexCustomerPage';
import CreateOrderPage from './pages/Order/CreateOrderPage';
import IndexOrderPage from './pages/Order/IndexOrderPage';

function App() {
  return (
    <Router>
       <Routes>
          <Route path="/customers" element={<IndexCustomerPage />} />
          <Route path="/customers/create" element={<CreateCustomerPage />} />
          <Route path="/orders" element={<IndexOrderPage />} />
          <Route path="/orders/create" element={<CreateOrderPage />} />
          <Route path="*" element={<IndexCustomerPage />} />
        </Routes>
    </Router>
  );
}

export default App;
