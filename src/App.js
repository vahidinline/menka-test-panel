import { Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import Home from './pages/home/Home';
import ChildInformationForm from './component/form/form';
import Payment from './pages/payment/payment';
import AuthIndex from './pages/auth';
import { useState } from 'react';
import QuestionsContext from './context/questions';
import HallWayIndex from './pages/hallWay/hallWayIndex';
import RoomIndex from './component/room/RoomIndex';
import ReactGA from 'react-ga';
import BeforeRoom from './component/beforeRoom';
const TRACKING_ID = 'UA-99012785-2'; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

function App() {
  const [questions, setQuestions] = useState([]);
  return (
    <QuestionsContext.Provider value={{ questions, setQuestions }}>
      <Routes>
        <Route>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<AuthIndex />} />
          <Route path="/form" element={<ChildInformationForm />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/hallway" element={<HallWayIndex />} />
          <Route path="/hallway/room/:id" element={<RoomIndex />} />
          <Route path="/getage" element={<BeforeRoom />} />
        </Route>
      </Routes>
    </QuestionsContext.Provider>
  );
}

export default App;
