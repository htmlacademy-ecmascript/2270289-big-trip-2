
const FilterType = {
  EVERYTHING: 'EVERYTHING',
  FUTURE: 'FUTURE',
  PRESENT: 'PRESENT',
  PAST: 'PAST',
};

const SortType = {
  DAY: 'DAY',
  EVENT: 'EVENT',
  TIME: 'TIME',
  PRICE: 'PRICE',
  OFFERS: 'OFFERS'};

const sortMap = ['day', 'event', 'time', 'price', 'offers'];
const filterMap = ['everything','future','present','past'];
const pathPointMap = ['Amsterdam', 'Geneva', 'Chamonix'];

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};


export {FilterType,filterMap,SortType,sortMap,pathPointMap,Mode};
