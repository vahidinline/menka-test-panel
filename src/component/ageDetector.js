function calculateAgeInYearsMonthsDays(familyBaseQuestions) {
  const birthdayDateStr = familyBaseQuestions[2]?.answer; // Use optional chaining to handle missing data
  if (!birthdayDateStr) {
    throw new Error('Birthday date not found or invalid.');
  }

  // Convert the date string to a Date object with the correct format "YYYY/MM/DD"
  const [year, month, day] = birthdayDateStr.split('/').map(Number);
  const birthdayDate = new Date(year, month - 1, day);

  if (isNaN(birthdayDate)) {
    throw new Error('Invalid date format. Expected format: YYYY/MM/DD');
  }

  const currentDate = new Date();
  const ageInMilliseconds = currentDate - birthdayDate;

  // Calculate the age in months and days
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const millisecondsPerMonth = millisecondsPerDay * 30.44; // Average number of days in a month

  const ageInMonths = Math.floor(ageInMilliseconds / millisecondsPerMonth);
  const ageInDays = Math.floor(
    (ageInMilliseconds % millisecondsPerMonth) / millisecondsPerDay
  );

  return { months: ageInMonths, days: ageInDays };
}
export default calculateAgeInYearsMonthsDays;
