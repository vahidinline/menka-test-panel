// import React, { useState } from 'react';
// import { Form, Button, Container, Row, Col } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import 'react-datepicker/dist/react-datepicker.css';
// import { ChildInformationFormThree } from '../../../data/questions.js';
// import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
// import MRangeSlider from '../rangeSlider.js';
// import PersianDatePicker from '../../persianDatePicker.js';
// const Q3 = (props) => {
//   const { setQ3 } = props;
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [q3Answers, setQ3Answers] = useState({});
//   const [completed, setCompleted] = useState(false);

//   const currentQuestion = ChildInformationFormThree[currentQuestionIndex];

//   const handleChange = (e, index) => {
//     const updatedFormData = { ...q3Answers };
//     updatedFormData[index] = e.target.value;
//     setQ3Answers(updatedFormData);
//   };

//   const handleNext = () => {
//     setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//   };

//   const handlePrevious = () => {
//     setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
//   };

//   const handleSubmit = (e) => {
//     setQ3(true);
//     console.log('set Q3 to true');
//     e.preventDefault();
//     // Perform form submission or further processing here
//     console.log('Form submitted:', q3Answers);
//     window.location.href = '/register';
//   };

//   const checkCompletion = () => {
//     const isCompleted =
//       Object.keys(q3Answers).length === ChildInformationFormThree.length;
//     setCompleted(isCompleted);
//   };

//   return (
//     <Container>
//       <Row
//         className="justify-content-md-center font-face-gm"
//         style={{ marginTop: '2rem' }}>
//         <Col xs lg="6">
//           <h3>سوالات چند تربیته بودن</h3>
//           <Form.Group controlId={`question${currentQuestionIndex + 1}`}>
//             <Form.Label>{currentQuestion.question}</Form.Label>
//             {currentQuestion.type === 'text' && (
//               <Form.Control
//                 type="text"
//                 value={q3Answers[currentQuestionIndex] || ''}
//                 onChange={(e) => handleChange(e, currentQuestionIndex)}
//               />
//             )}

//             {currentQuestion.type === 'number' && (
//               <MRangeSlider min={0} max={10} step={1} />
//             )}
//             {currentQuestion.type === 'radio' && (
//               <div>
//                 {currentQuestion.options.map((option, optionIndex) => (
//                   <Form.Check
//                     key={optionIndex}
//                     type="radio"
//                     id={`question${currentQuestionIndex + 1}-option${
//                       optionIndex + 1
//                     }`}
//                     label={option}
//                     value={option}
//                     checked={q3Answers[currentQuestionIndex] === option}
//                     onChange={(e) => handleChange(e, currentQuestionIndex)}
//                   />
//                 ))}
//               </div>
//             )}
//           </Form.Group>
//           <div className="d-flex justify-content-between">
//             <Button
//               onClick={handlePrevious}
//               style={{ textDecoration: 'none' }}
//               className="btn btn-primary mt-3 mb-3"
//               size="lg"
//               disabled={currentQuestionIndex === 0}>
//               قبلی
//             </Button>
//             {currentQuestionIndex < ChildInformationFormThree.length - 1 ? (
//               <Button
//                 onClick={handleNext}
//                 style={{ textDecoration: 'none' }}
//                 className="btn btn-primary mt-3 mb-3"
//                 size="lg"
//                 //disabled={!q1Answers[currentQuestionIndex]}>
//               >
//                 {' '}
//                 بعدی
//               </Button>
//             ) : (
//               <Button
//                 onClick={handleSubmit}
//                 style={{ textDecoration: 'none' }}
//                 className="btn btn-primary mt-3 mb-3"
//                 size="lg"
//                 // disabled={!q3Answers[currentQuestionIndex]}>
//               >
//                 {' '}
//                 ثبت فرم و ادامه
//               </Button>
//             )}
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Q3;
