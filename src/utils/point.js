import dayjs from 'dayjs';

const getDurationEventPointHour = (dateFrom, dateTo) => dayjs(dateTo).diff(dateFrom,'hour');

function sortPointDay(pointA, pointB) {
  console.log('Сортируем по дате');
  return dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom))
}

function sortPointTime(pointA, pointB) {
  console.log('Сортируем по времени')
  const durationPointA = getDurationEventPointHour(pointA.dateFrom, pointA.dateTo);
  const durationPointB = getDurationEventPointHour(pointB.dateFrom, pointB.dateTo);
  return durationPointA - durationPointB;
}

function sortPointPrice(pointA, pointB) {
  console.log('Сортируем по цене')
  return pointA.basePrice - pointB.basePrice;
}

export {sortPointDay,sortPointTime,sortPointPrice};
