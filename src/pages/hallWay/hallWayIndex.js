import { useContext, useEffect, useState } from 'react';
import QuestionsContext from '../../context/questions';
import RoomIndex from '../../component/room/RoomIndex';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import { FaLock } from 'react-icons/fa';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useNavigate } from 'react-router-dom';
import Door from './door';

const HallWayIndex = () => {
  //get item form local dtorage
  const questions = JSON.parse(localStorage.getItem('questions'));
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [ageGroup, setAgeGroup] = useState('');
  const [openDoor, setOpenDoor] = useState(false);
  const [roomName, setRoomName] = useState('');
  const navigate = useNavigate();

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
  }, [openDoor]);

  const handleEnterRoom = ({ room, questions }) => {
    setRoomName(room);
    console.log(room);
    //setOpendoor true if room is equal to roomType
    setOpenDoor(room === roomName);
    navigate(`/hallway/room/${room}`, {
      state: { questions: questions, room: room, ageGroup: ageGroup },
    });
  };

  return (
    <Container className="font-face-gm">
      <Row>
        <Col>
          <h1></h1>
        </Col>
      </Row>
      <Row>
        <Col
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}>
          {/* map all roomType and navigate to them */}
          {roomTypes?.map((room, index) => (
            <Card style={{ margin: '30px', width: '20rem', border: 'none' }}>
              <Card.Header
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100px',
                  backgroundColor: '#f8f9fa',
                }}>
                <h3>{room}</h3>
              </Card.Header>
              <Card.Body
                onClick={() =>
                  handleEnterRoom({
                    room: room,
                    questions: filteredQuestions[index],
                    ageGroup: ageGroup,
                  })
                }>
                <Link
                  state={{
                    room: room,
                    questions: filteredQuestions[index],
                  }}
                  to={`/hallway/room/${room}}`}>
                  <Door openDoor={true} />
                </Link>
                {/* <FaLock className="lock-icon" /> */}
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default HallWayIndex;
