import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AgeGroups from '../data/ageGroup';
import calculateAgeInYearsMonthsDays from './ageDetector';
import { useNavigate } from 'react-router-dom';
import { Button, Placeholder } from 'react-bootstrap';

function BeforeRoom() {
  const [age, setAge] = useState(0);
  console.log(age);
  const [birthDate, setBirthDate] = useState();
  const navigate = useNavigate();
  const getBirthDate = () => {
    const data = localStorage.getItem('q0');
    const parsedData = JSON.parse(data);
    const birthDate = parsedData[2].answer;
    setBirthDate(birthDate);
    console.log(birthDate);
    return birthDate;
  };
  function getAgeGroupByAge(age) {
    console.log(age.months);
    const ageInDays = age.months * 30.44; // Average number of days in a month

    // Find the matching age group based on the given age in days
    const matchingAgeGroup = AgeGroups.find((ageGroup) => {
      const [startMonth, startDay] = ageGroup.code
        .split('-')[0]
        .split('.')
        .map(Number);
      const [endMonth, endDay] = ageGroup.code
        .split('-')[1]
        .split('.')
        .map(Number);

      const startAgeInDays = startMonth * 30.44;
      console.log('startAgeInDays', startAgeInDays);
      const endAgeInDays = endMonth * 30.44;
      console.log('endAgeInDays', endAgeInDays);
      return ageInDays >= startAgeInDays && ageInDays <= endAgeInDays;
    });

    console.log('matchingAgeGroup', matchingAgeGroup);
    localStorage.setItem(
      'ageGroup',
      JSON.stringify(
        matchingAgeGroup === undefined ? 'زیر یک ماه' : matchingAgeGroup
      )
    );
  }

  const handleSubmitData = async () => {
    try {
      const familyBaseQuestions = localStorage.getItem('q0');
      const familyBaseQuestionsParsed = JSON.parse(familyBaseQuestions);
      const age = calculateAgeInYearsMonthsDays(familyBaseQuestionsParsed);
      console.log(age);
      setAge(age);
      const matchingAgeGroup = getAgeGroupByAge(age);
      localStorage.setItem('q0', JSON.stringify(familyBaseQuestionsParsed));
      if (age !== 0) {
        console.log('success');
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBirthDate();
    handleSubmitData();
  }, []);

  return (
    <div>
      <>
        <Placeholder xs={6} />
        <Placeholder className="w-75" />{' '}
        <Placeholder style={{ width: '25%' }} />
      </>
      سن کودک:
      {age?.months} ماه - {age?.days} روز
      <br />
      <Button
        onClick={() => {
          navigate('/hallway');
        }}>
        ورود به اتاق ها
      </Button>
    </div>
  );
}

export default BeforeRoom;
