const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekDayNames = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const dateConverter = (dateRaw, includeTime) => {
  const date = new Date(dateRaw);
  const today = new Date();

  const hasSameMonthAndYear =
    today.getMonth() === date.getMonth() &&
    today.getFullYear() === date.getFullYear();
  const isToday = today.getDate() === date.getDate() && hasSameMonthAndYear;
  const isYesterday =
    today.getDate() - 1 === date.getDate() && hasSameMonthAndYear;
  const isTomorrow =
    today.getDate() + 1 === date.getDate() && hasSameMonthAndYear;

  const dateWeekDay = date.getDay();
  const dateDay = date.getDate();
  const dateMonth = date.getMonth();
  const dateYear = date.getFullYear();
  const dateMinutes = ("0" + date.getMinutes()).slice(-2);
  let dateHours = date.getHours();

  const period = dateHours > 11 ? "PM" : "AM";
  dateHours = dateHours > 12 ? dateHours - 12 : dateHours;

  const appendTimeString = includeTime
    ? " at " + dateHours + ":" + dateMinutes + " " + period
    : "";
  if (isToday) {
    return "Today" + appendTimeString;
  } else if (isYesterday) {
    return "Yesterday" + appendTimeString;
  } else if (isTomorrow) {
    return "Tomorrow" + appendTimeString;
  } else {
    return (
      weekDayNames[dateWeekDay] +
      ", " +
      monthNames[dateMonth] +
      " " +
      dateDay +
      ", " +
      dateYear +
      appendTimeString
    );
  }
};
