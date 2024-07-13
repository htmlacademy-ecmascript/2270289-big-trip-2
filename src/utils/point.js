import dayjs from 'dayjs';

const getDurationEventPointHour = (dateFrom, dateTo) => dayjs(dateTo).diff(dateFrom,'hour');

const sortPointDay = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

const sortPointTime = (pointA, pointB) => {
  const durationPointA = getDurationEventPointHour(pointA.dateFrom, pointA.dateTo);
  const durationPointB = getDurationEventPointHour(pointB.dateFrom, pointB.dateTo);
  return durationPointA - durationPointB;
};

const sortPointPrice = (pointA, pointB) => pointA.basePrice - pointB.basePrice;

export {sortPointDay,sortPointTime,sortPointPrice};
