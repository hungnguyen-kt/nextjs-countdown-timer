/**
 * @description convert date to format: yyyy-mm-dd to yyyy-mm-ddThh:mm:ssZ
 * @param date format: yyyy-mm-dd
 * @returns string
 */
export const convertDate = (date: string) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Auguest',
    'September',
    'October',
    'November',
    'December',
  ];

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const d = new Date(date);
  return `${daysOfWeek[d.getDay()]} ${
    months[d.getMonth()]
  } ${d.getDate()}, ${d.getFullYear()}`;
};
