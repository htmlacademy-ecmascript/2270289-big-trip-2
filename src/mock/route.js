import {getRandomArrayElement, getRandomInteger} from '../utils.js';
const LIMIT_COUNT_PROPOSAL = 5;

const cities = ['Amsterdam','Chamonix','Geneva'];
const typePointsMap = ['Taxi','Bus','Train','Ship','Drive','Flight','Check-in','Sightseeing','Restaurant',];
const offersNameMap = ['meal','luggage','seats','business lounge','business class','radio','music',];
const descriptionsMap = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'];

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

const getRandomDescriptions = () => {
  const countProposal = getRandomInteger(LIMIT_COUNT_PROPOSAL);
  const arrayProposal = [];
  for (let i = 0; i < countProposal; i++) {
    const numberProposal = getRandomInteger(descriptionsMap.length);
    arrayProposal.pash(descriptionsMap[numberProposal]);
  }
  return arrayProposal;
};

const getRandomOffers = () => {

}

const pointDestinationMap = [{
  description: getRandomDescriptions(),
  nameDestination : 'Amsterdam' ,
  photos: ['../img/photos/1.jpg','../img/photos/2.jpg'],
},
{
  description: getRandomDescriptions(),
  nameDestination : 'Chamonix',
  photos: ['../img/photos/3.jpg','../img/photos/4.jpg'],
},
{
  description: getRandomDescriptions(),
  nameDestination : 'Geneva',
  photos: ['../img/photos/5.jpg'],
}
];


const mockEvents = [
  {
    point: pointDestinationMap[0],
    offers: getRandomOffers(),
    time: '18 mar',
    price: '1000$',
    isArchive: false,
    isFavorite: false,
  },
  {
    point: pointDestinationMap[1],
    offers: getRandomOffers(),
    time: '19 mar',
    price: '1600$',
    isArchive: false,
    isFavorite: false,
  },
  {
    point: pointDestinationMap[2],
    offers: getRandomOffers(),
    time: '20 mar',
    price: '1300$',
    isArchive: false,
    isFavorite: false,
  },
];

function getRandomEvent() {
  return getRandomArrayElement(mockEvents);
}

export {getRandomEvent};
