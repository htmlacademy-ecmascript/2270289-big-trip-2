
const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'};

const sortMap = ['day', 'event', 'time', 'price', 'offers'];
const filterMap = ['everything','future','present','past'];
const pathPointMap = ['Amsterdam', 'Geneva', 'Chamonix'];

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};


export {FilterType,filterMap,SortType,sortMap,pathPointMap,Mode};
