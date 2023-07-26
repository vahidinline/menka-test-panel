// import React, { useState } from 'react';
// import { Form, Button, Container, Row, Col } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { ChildInformationFormOne } from '../../../data/questions.js';
// import PersianDatePicker from '../../persianDatePicker.js';
// import MRangeSlider from '../rangeSlider.js';
// const Q1 = (props) => {
//   const { setQ1 } = props;
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [q1Answers, setQ1Answers] = useState({});
//   const [completed, setCompleted] = useState(false);

//   const currentQuestion = ChildInformationFormOne[currentQuestionIndex];

//   const handleChange = (e, index) => {
//     const updatedFormData = { ...q1Answers };
//     updatedFormData[index] = e.target.value;
//     setQ1Answers(updatedFormData);
//   };

//   const handleDateChange = (date, index) => {
//     const updatedFormData = { ...q1Answers };
//     updatedFormData[index] = date;
//     setQ1Answers(updatedFormData);
//   };

//   const handleNext = () => {
//     setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//   };

//   const handlePrevious = () => {
//     setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
//   };

//   const handleSubmit = (e) => {
//     setQ1(true);
//     console.log('set Q1 to true');
//     e.preventDefault();
//     // Perform form submission or further processing here
//     console.log('Form submitted:', q1Answers);
//     //navigate to registration page
//   };

//   const checkCompletion = () => {
//     const isCompleted =
//       Object.keys(q1Answers).length === ChildInformationFormOne.length;
//     setCompleted(isCompleted);
//   };

//   return (
//     <Container>
//       <Row
//         className="justify-content-md-center font-face-gm"
//         style={{ marginTop: '2rem' }}>
//         <Col xs lg="6">
//           <h3>بررسی بستر خانواده و محیط کودک</h3>
//           <Form.Group controlId={`question${currentQuestionIndex + 1}`}>
//             <Form.Label>{currentQuestion.question}</Form.Label>
//             {currentQuestion.type === 'text' && (
//               <Form.Control
//                 type="text"
//                 value={q1Answers[currentQuestionIndex] || ''}
//                 onChange={(e) => handleChange(e, currentQuestionIndex)}
//               />
//             )}
//             {currentQuestion.type === 'date' && (
//               <PersianDatePicker
//                 value={q1Answers[currentQuestionIndex]}
//                 onChange={(date) =>
//                   handleDateChange(date, currentQuestionIndex)
//                 }
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
//                     checked={q1Answers[currentQuestionIndex] === option}
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
//             {currentQuestionIndex < ChildInformationFormOne.length - 1 ? (
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
//                 //disabled={!q1Answers[currentQuestionIndex]}
//               >
//                 ثبت فرم و ادامه
//               </Button>
//             )}
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Q1;
