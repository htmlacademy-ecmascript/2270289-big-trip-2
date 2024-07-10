import {getRandomArrayElement} from '../utils/utils.js';

const mockPoints = [
  {
    id: 'point0',
    basePrice: 1000,
    dateFrom: '2019-07-07T22:55:56.845Z',
    dateTo: '2019-07-08T02:22:13.375Z',
    destination: 'dest-Moscow',
    isFavorite: false,
    offers: [
      'bus3',
      'bus4',
    ],
    type: 'bus'
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
    dateFrom: '2020-07-08T22:55:56.845Z',
    dateTo: '2020-07-09T11:22:13.375Z',
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
    dateFrom: '2020-07-13T22:55:56.845Z',
    dateTo: '2020-07-14T11:22:13.375Z',
    destination: 'dest-Omsk',
    isFavorite: true,
    offers: [
      'flight1',
    ],
    type: 'flight'
  },
  {
    id: 'point5',
    basePrice: 4245,
    dateFrom: '2020-07-12T22:55:56.845Z',
    dateTo: '2020-07-15T11:22:13.375Z',
    destination: 'dest-Washington',
    isFavorite: false,
    offers: [
      'ship1',
      'ship2',
      'ship5',
    ],
    type: 'ship'
  },
  {
    id: 'point6',
    basePrice: 6452,
    dateFrom: '2020-07-19T22:55:56.845Z',
    dateTo: '2020-07-20T11:22:13.375Z',
    destination: 'dest-Washington',
    isFavorite: false,
    offers: [
      'ship1',
      'ship2',
      'ship5',
    ],
    type: 'ship'
  },
  {
    id: 'point7',
    basePrice: 4245,
    dateFrom: '2020-07-22T22:55:56.845Z',
    dateTo: '2020-07-23T11:22:13.375Z',
    destination: 'dest-Washington',
    isFavorite: false,
    offers: [
      'flight1',
      'flight2',
    ],
    type: 'flight'
  },
];

const mockDefaultPoint = [
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
]

const getMockPoint = () => mockPoints;

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

function getRandomUniquePoint(count) {
  const randomPoints = Array.from({length:count},getRandomPoint);
  const randomPointsSet = new Set(randomPoints);
  return Array.from(randomPointsSet);
}

export {getRandomPoint,getMockPoint,getRandomUniquePoint};
