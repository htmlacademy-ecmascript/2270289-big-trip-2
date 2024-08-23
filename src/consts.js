
const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const SortType = {
  DEFAULT: 'default',
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const ListTextForEmptyPoint = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now',
};

const sortMap = ['day', 'event', 'time', 'price', 'offers'];
const filterMap = ['everything','future','present','past'];
const pathPointMap = ['Amsterdam', 'Geneva', 'Chamonix'];

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};


export {FilterType,filterMap,SortType,sortMap,pathPointMap,Mode,UserAction,UpdateType,ListTextForEmptyPoint};
