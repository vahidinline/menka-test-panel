import { useContext, useEffect, useState } from 'react';
import QuestionsContext from '../../context/questions';
import RoomIndex from '../../component/room/RoomIndex';
import { Card, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import Door from '../../assets/door.json';
import { FaLock } from 'react-icons/fa';

const HallWayIndex = () => {
  //get item form local dtorage
  const questions = JSON.parse(localStorage.getItem('questions'));
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
console.log(roomTypes)
  useEffect(() => {
    const filterQuestionsByRoom = (roomName) => {
      return questions.filter((question) => question.roomType === roomName);
    };

    // Extract unique room names from questions
    const uniqueRoomTypes = [
      ...new Set(questions.map((question) => question.roomType)),
    ];

    // Filter questions for each room type and store them in filteredQuestions
    const filteredQuestionsByRoom = uniqueRoomTypes.map((roomType) =>
      filterQuestionsByRoom(roomType)
    );

    setFilteredQuestions(filteredQuestionsByRoom);
    setRoomTypes(uniqueRoomTypes);
  }, []);

  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: Door,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Container>
      <Col
      className='font-face-gm '
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          
        }}
      >
        {/* map all roomType and navigate to them */}
        {roomTypes?.map((room, index) => (
          <Card style={{ margin: '20px' }}>
            <Card.Body>
            <Card.Title>
               اتاق سوالات  {room}  <FaLock className="lock-icon" />
              </Card.Title>
              <div
                style={{
                  position: 'relative',
                  // width: '400px',
                  // height: '400px',
                  opacity: 1,
                }}>
               
                <Link
                state={{
                  room: room,
                  questions: filteredQuestions[index],
                }}
                to={`/hallway/room/${room}}`}>
                <Lottie options={defaultOptions} height={400} width={400} /> </Link>
              </div>
          
            </Card.Body>
        
          </Card>
        ))}
      </Col>
    </Container>
  );
};

export default HallWayIndex;
