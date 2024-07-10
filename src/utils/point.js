import dayjs from 'dayjs';

const getDifferensInMilliseconds = (dateFrom, dateTo) => dayjs.utc(dateTo).diff(dayjs.utc(dateFrom));


function sortPointDay() {
  console.log('Сортируем по дню')
}

function sortPointTime(pointA, pointB) {
  console.log('Сортируем по времени')
  const durationInHoursA = getDifferensInMilliseconds(pointA.dateFrom, pointA.dateTo);
  const durationInHoursB = getDifferensInMilliseconds(pointB.dateFrom, pointB.dateTo);
  return durationInHoursB - durationInHoursA;
}

function sortPointPrice(pointA, pointB) {
  console.log('Сортируем по цене')
  return pointA.basePrice - pointB.basePrice;
}

export {sortPointDay,sortPointTime,sortPointPrice};