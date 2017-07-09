const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export function monthList() {
  return months;
}

export function maxYear() {
  let date = new Date();
  return date.getFullYear() - 8;
}

export function minYear() {
  let date = new Date();
  return date.getFullYear() - 100;
}

export function monthMaxdays(month, year) {
  let date = new Date(year, months.indexOf(month) + 1, 0);
  return date.getDate();
}

export function toFormalDateTime(timestamp) {
  let date = new Date(timestamp);
  
  let hours_raw = date.getHours();
  let notation = hours_raw >= 12? 'PM' : 'AM';

  let minutes = date.getMinutes();
  minutes = minutes < 10? '0' + minutes : minutes;

  return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear() +
    ' ' + ((hours_raw + 11) % 12 + 1) + ':' + minutes + ' ' + notation;
}

export function toUnixTimestamp(timestamp) {
  let date = new Date(timestamp);
  return Math.floor(date.getTime() / 1000);
}

export function unixTimestampNow() {
  return Math.floor(Date.now() / 1000);
}