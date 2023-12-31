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
import { useJwt } from 'react-jwt';

const HallWayIndex = () => {
  //get item form local dtorage
  const questions = JSON.parse(localStorage.getItem('questions'));
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [token, setToken] = useState(null);

  const { decodedToken, isExpired } = useJwt(token);
  console.log('decodedToken', decodedToken);
  const [roomTypes, setRoomTypes] = useState([
    // { name: 'ارتباطات', open: false, done: false },
    // { name: 'حرکات درشت', open: false, done: false },
    // { name: 'حرکات ظریف', open: false, done: false },
    // { name: 'حل مساله', open: false, done: false },
    // { name: 'مهارت های شخصی و اجتماعی ', open: false, done: false },
    // { name: 'سوالات کلی', open: false, done: false },
  ]);
  console.log('roomTypes', roomTypes);
  const [ageGroup, setAgeGroup] = useState('');
  const [openDoor, setOpenDoor] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [parentName, setParentName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setAgeGroup(JSON.parse(localStorage.getItem('ageGroup')));
  }, []);
  useEffect(() => {
    setToken(localStorage.getItem('token'));
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

  useEffect(() => {
    const result = localStorage.getItem(`${roomName}-answers`);
    if (result) {
      setOpenDoor(true);
    }
  }, [roomName]);

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem('q0'));
    const parent = result[0].answer;
    setParentName(parent);
  }, []);

  const handleEnterRoom = ({ room, questions }) => {
    setRoomName(room);
    console.log(room);
    //setOpendoor true if room is equal to roomType
    setOpenDoor(room === roomName);
    navigate(`/hallway/room/${room}`, {
      state: {
        questions: questions,
        room: room,
        ageGroup: ageGroup,
        done: room.done,
        userId: decodedToken?.id,
      },
    });
  };

  return (
    <Container className="font-face-gm">
      <Row>
        <Col>
          <Card
            style={{
              width: '100%',
              height: 'rem',
              marginTop: '10px',
              borderColor: '#f8f9fa',
              borderRadius: '5px',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            }}>
            <Card.Body>
              <Card.Title>پدر/مادر {parentName}</Card.Title>
              <Card.Title>به منکا خوش امدید</Card.Title>
              <Card.Text>
                لطفا از طریق اتاق های زیر وارد تست مورد نظر خود شوید
              </Card.Text>
            </Card.Body>
          </Card>
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
            <Card
              key={index}
              style={{ margin: '30px', width: '20rem', border: 'none' }}>
              <Card.Header
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',

                  backgroundColor: '#f8f9fa',
                }}>
                <h6>سوالات مربوط به بخش {room}</h6>
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
                    room: room.name,
                    done: room.done,
                    userId: decodedToken,
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
