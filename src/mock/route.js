import {getRandomArrayElement} from '../utils.js';

const cities = ['Amsterdam','Chamonix','Geneva'];

const typePointMap = {
  1: 'Taxi',
  2: 'Bus',
  3: 'Train',
  4: 'Ship',
  5: 'Drive',
  6: 'Flight',
  7: 'Check-in',
  8: 'Sightseeing',
  9: 'Restaurant',
};

const offersNameMap = {
  1: 'meal',
  2: 'luggage',
  3: 'seats',
  4: 'business lounge',
  5: 'business class',
  6: 'radio',
  7: 'music',
};

const offer = {
  type: '',
  nameOffer: '',
  price: 0,
};

const offersMap = [{
  type: 'add',
  nameOffer: 'luggage',
  currency: '$',
  price: 50,
},
{
  type: 'add',
  nameOffer: 'meal',
  currency: '$',
  price: 15,
},
{
  type: 'add',
  nameOffer: 'breakfast',
  currency: '$',
  price: 60,
},
{
  type: 'add',
  nameOffer: 'lunch',
  currency: '$',
  price: 110,
},
{
  type: 'add',
  nameOffer: 'dinner',
  currency: '$',
  price: 120,
},
{
  type: 'choose',
  nameOffer: 'seats',
  currency: '$',
  price: 5,
},
{
  type: 'choose',
  nameOffer: 'laundry',
  currency: '$',
  price: 140,
},
{
  type: 'switch to',
  nameOffer: 'comfort',
  currency: '$',
  price: 80,
},
{
  type: 'switch to',
  nameOffer: 'business',
  currency: '$',
  price: 120,
},
{
  type: 'travel by',
  nameOffer: 'train',
  currency: '$',
  price: 40,
},
{
  type: 'travel by',
  nameOffer: 'ship',
  currency: '$',
  price: 140,
}
];

const mockEvents = [
  {
    description: `${typePointMap[1]} ${cities[0]}`,
    offers: [{
      type:'choose',
      nameOffer: offersNameMap[1],
      price: '100$',
    },
    {
      type:'choose',
      nameOffer: offersNameMap[2],
      price: '100$',
    },
    {
      type:'add',
      nameOffer: offersNameMap[3],
      price: '100$',
    }
    ],
    time: '18 mar',
    price: '1200$',
    isArchive: false,
    isFavorite: false,
  },
  {
    description: `${typePointMap[1]} ${cities[1]}`,
    offers: [{
      type:'choose',
      nameOffer: offersNameMap[2],
      price: '100$',
    }
    ],
    time: '18 mar',
    price: '700$',
    isArchive: false,
    isFavorite: false,
  },
  {
    description: `${typePointMap[1]} ${cities[0]}`,
    offers: [{
      type:'choose',
      nameOffer: offersNameMap[1],
      price: '100$',
    },
    {
      type:'choose',
      nameOffer: offersNameMap[2],
      price: '100$',
    }
    ],
    time: '19 mar',
    price: '1400$',
    isArchive: false,
    isFavorite: false,
  },
];

function getRandomEvent() {
  return getRandomArrayElement(mockEvents);
}

export {getRandomEvent};
