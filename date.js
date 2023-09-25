function getDate() {
  const x = new Date();
  const d = x.getDay();
  const m = x.getMonth();
  const date = x.getDate();
  const y = x.getFullYear();
  const fullDate = `${day[d]}, ${month[m]} ${date}, ${y}`;

  return fullDate;
}

const day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const month = [
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
module.exports = getDate();
