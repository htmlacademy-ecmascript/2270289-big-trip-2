import dayjs from 'dayjs';

const DATE_FORMAT_MMM_D = 'MMM D';
const DATE_FORMAT_YYYY_MM_DD = 'YYYY-MM-DD'; //2019-03-18
const DATE_FORMAT_YYYY_MM_DD_HH_MIN = 'YYYY-MM-DD hh:mm'; //
const DATE_FORMAT_MM_DD_HH_MIN = 'MM-DD hh:mm'; //
const DATE_FORMAT_DD_MM_GG_SLASH = 'DD/MM/YY hh:mm'; //

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
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT_YYYY_MM_DD_HH_MIN) : '' ;
}

function humanizeMonthDayHourMinute(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT_MM_DD_HH_MIN) : '' ;
}

function humanizeDayMonthYearSlash(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT_DD_MM_GG_SLASH) : '' ;
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
export {humanizeDayMonthYearSlash};
