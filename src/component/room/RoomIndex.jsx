//component should provide a list of questions regarding the room name.
//user has 3 days to answer the questions.
//should get data of questions from the server, call the Menka input component for each question.
//should has video and text to describe the room.
//if user answered all the questions, the room will be closed
//room must be locked based on the parent condition

import Question from '../question';
import { useLocation } from 'react-router-dom';
const RoomIndex = (props) => {
  const location = useLocation();
  const { questions, room } = location.state;

  console.log(location);

  return (
    <div className="font-face-gm">
      <h1>اتاق {room}</h1>

      {questions.map((question) => (
        <Question question={question} />
      ))}
    </div>
  );
};

export default RoomIndex;
