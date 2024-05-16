import dayjs from 'dayjs';

const DATE_FORMAT_D_MMMM = 'D MMMM';
const DATE_FORMAT_MMM_D = 'MMM D';
const DATE_FORMAT_YYYY_MM_DD = 'YYYY-MM-DD'; //2019-03-18
const DATE_FORMAT_YYYY_MM_DD_hh_mm = 'YYYY-MM-DD hh:mm'; //2019-03-18
const DATE_FORMAT_MM_DD_hh_mm = 'MM-DD hh:mm'; //2019-03-18
// 2019-03-18T10:30

function getRandomInteger(limitNumber) {
  return Math.floor(Math.random() * limitNumber);
}

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizeDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT_MMM_D) : '' ;
}

function humanizeDateAtribute(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT_YYYY_MM_DD) : '' ;
}

function humanizeDateHourMinute(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT_YYYY_MM_DD_hh_mm) : '' ;
}

function humanizeMonthDayHourMinute(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT_MM_DD_hh_mm) : '' ;
}

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

export {getRandomArrayElement,getRandomInteger,humanizeDate,humanizeDateAtribute,humanizeDateHourMinute,humanizeMonthDayHourMinute,durationEventPoint};
