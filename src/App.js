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
import Home from './pages/home/Home';
import LoginFormEmail from './pages/auth/loginEmail';
import ChildInformationForm from './component/form/form';
import Payment from './pages/payment/payment';
import AuthIndex from './pages/auth';
import { useState } from 'react';
import QuestionsContext from './context/questions';
import HallWayIndex from './pages/hallWay/hallWayIndex';
import RoomIndex from './component/room/RoomIndex';

function App() {
  const [questions, setQuestions] = useState([]);
  return (
    <QuestionsContext.Provider value={{ questions, setQuestions }}>
      <Routes>
        <Route>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<AuthIndex />} />
          <Route path="/form" element={<ChildInformationForm />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/hallway" element={<HallWayIndex />} />
          <Route path="/hallway/room/:id" element={<RoomIndex />} />
        </Route>
      </Routes>
    </QuestionsContext.Provider>
  );
}

export default App;
