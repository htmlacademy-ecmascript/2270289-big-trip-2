import dayjs from 'dayjs';

const DATE_FORMAT = 'D MMMM';

function getRandomInteger(limitNumber) {
  return Math.floor(Math.random() * limitNumber);
}

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizePointDueDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '' ;
}

export {getRandomArrayElement,getRandomInteger,humanizePointDueDate};
