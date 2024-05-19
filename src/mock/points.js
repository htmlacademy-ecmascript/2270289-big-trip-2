//const mockNameOffersMap = ['taxi','bus','train','ship','transport','flight','check-in','sightseeing','restaurant',];
import {getRandomArrayElement} from '../utils.js';

const mockPoints = [
  {
    id: '0',
    basePrice: 0,
    dateFrom: '',
    dateTo: '',
    destination: '',
    isFavorite: false,
    offers: [],
    type: ''
  },
  {
    id: 'point1',
    basePrice: 1100,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T02:22:13.375Z',
    destination: 'dest-Amsterdam',
    isFavorite: false,
    offers: [
      'taxi1',
      'taxi3',
      'taxi5',
      'taxi7',
    ],
    type: 'taxi'
  },
  {
    id: 'point2',
    basePrice: 1111,
    dateFrom: '2020-07-10T22:55:56.845Z',
    dateTo: '2020-07-12T11:22:13.375Z',
    destination: 'dest-Chamonix',
    isFavorite: false,
    offers: [
      'bus1',
      'bus2',
      'bus4',
    ],
    type: 'bus'
  },
  {
    id: 'point3',
    basePrice: 2222,
    dateFrom: '2020-07-10T22:55:56.845Z',
    dateTo: '2020-07-13T11:22:13.375Z',
    destination: 'dest-Geneva',
    isFavorite: false,
    offers: [
      'train2',
      'train4',
    ],
    type: 'train'
  },
  {
    id: 'point4',
    basePrice: 3333,
    dateFrom: '2020-07-10T22:55:56.845Z',
    dateTo: '2020-07-11T11:22:13.375Z',
    destination: 'dest-Omsk',
    isFavorite: true,
    offers: [
      'flight1',
    ],
    type: 'flight'
  },
];

const getMockPoint = () => mockPoints;

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export {getRandomPoint,getMockPoint};
