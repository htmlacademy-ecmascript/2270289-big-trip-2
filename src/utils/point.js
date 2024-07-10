import dayjs from 'dayjs';

//const getDifferensInMilliseconds = (dateFrom, dateTo) => dayjs.utc(dateTo).diff(dayjs.utc(dateFrom));
//const getDifferensInMilliseconds = (dateFrom, dateTo) => dayjs(dateTo).diff(dayjs(dateFrom));

const getDurationEventPointHour = (dateFrom, dateTo) => dayjs(dateTo).diff(dateFrom,'hour');

function durationEventPoint(dueDateFrom,dueDateTo) {
  if (dueDateFrom && dueDateTo) {
    const differentDays = dayjs(dueDateTo).diff(dueDateFrom,'day');
    if (differentDays < 1) {
      const differentHour = dayjs(dueDateTo).diff(dueDateFrom,'hour');
      return `${differentHour}H`;
    } else {
      const additionalDate = dayjs(dueDateFrom).add(differentDays,'day');
      const differentHourTwo = dayjs(dueDateTo).diff(additionalDate,'hour');
      return `${differentDays}D ${differentHourTwo}H`;
    }
  } else {
    return '';
  }
}

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
