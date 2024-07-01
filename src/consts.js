
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


export {FilterType,filterMap,SortType,sortMap};
