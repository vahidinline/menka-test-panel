import React from 'react';
import moment from 'moment-jalaali';
import DatePicker from 'react-datepicker2';

const PersianDatePicker = ({ value, onChange }) => {
  const handleDateChange = (date) => {
    const formattedDate = moment(date).format('YYYY/MM/DD'); // Adjust the format according to your needs
    onChange(formattedDate);
  };

  const formattedValue = value ? moment(value, 'YYYY/MM/DD') : null;

  return (
    <DatePicker
      timePicker={false}
      isGregorian={false}
      value={formattedValue}
      onChange={handleDateChange}
      className="form-control"
    />
  );
};

export default PersianDatePicker;
