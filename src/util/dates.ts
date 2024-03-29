function monthName(month: number) {
  const map = [
    'Fixed',
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
  return map[month];
}

export {monthName};