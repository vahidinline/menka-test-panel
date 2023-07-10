import React, { useState } from 'react';
import moment from 'moment-jalaali';
import DatePicker from 'react-datepicker2';

const PersianDatePicker = () => {
  const [value, setValue] = useState(moment());

  const handleDateChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <DatePicker
      timePicker={false}
      isGregorian={false}
      onChange={handleDateChange}
      value={value}
    />
  );
};

export default PersianDatePicker;
