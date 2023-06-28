import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';

import LoginFormPhone from './pages/auth/loginPhone';
import Sidebar from './component/sidebar';
import Home from './pages/auth/home/Home';
import LoginFormEmail from './pages/auth/loginEmail';
import ChildInformationForm from './component/form/form';
import Payment from './pages/payment/payment';
import AuthIndex from './pages/auth';

function App() {
  return (
    <Routes>
      <Route>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<AuthIndex />} />
        <Route path="/form" element={<ChildInformationForm />} />
        <Route path="/payment" element={<Payment />} />
      </Route>
    </Routes>
  );
}

export default App;
