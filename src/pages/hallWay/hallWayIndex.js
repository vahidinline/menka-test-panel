import { useContext, useEffect, useState } from 'react';
import QuestionsContext from '../../context/questions';
import RoomIndex from '../../component/room/RoomIndex';
import { Card, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import Door from '../../assets/door.json';
import { FaLock } from 'react-icons/fa';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const HallWayIndex = () => {
  //get item form local dtorage
  const questions = JSON.parse(localStorage.getItem('questions'));
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [ageGroup, setAgeGroup] = useState('');
  console.log(ageGroup);
  useEffect(() => {
    setAgeGroup(JSON.parse(localStorage.getItem('ageGroup')));
  }, []);

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
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
        {ageGroup?.title}
        {/* map all roomType and navigate to them */}
        {roomTypes?.map((room, index) => (
          <Card style={{ margin: '30px', width: '25rem' }}>
            <Card.Body>
              <FaLock className="lock-icon" />
              <Link
                state={{
                  room: room,
                  questions: filteredQuestions[index],
                }}
                to={`/hallway/room/${room}}`}>
                <Lottie options={defaultOptions} height={400} width={400} />
              </Link>
            </Card.Body>
          </Card>
        ))}
      </Col>
    </Container>
  );
};

export default HallWayIndex;
