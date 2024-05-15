
const mockOffers = [
  {
    type: 'taxi',
    offers: [
      {
        id: 'taxi1',
        title: 'Upgrade to a business class',
        price: 120,
      },
      {
        id: 'taxi2',
        title: 'Switch to comfort',
        price: 120,
      },
      {
        id: 'taxi3',
        title: 'Choose the radio station',
        price: 30,
      },
      {
        id: 'taxi4',
        title: 'Choose temperature',
        price: 70,
      },
      {
        id: 'taxi5',
        title: 'Drive quickly, I\'m in a hurry',
        price: 120,
      },
      {
        id: 'taxi6',
        title: 'Include in transportation of children',
        price: 100,
      },
      {
        id: 'taxi7',
        title: 'Drive slowly',
        price: 170,
      },
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: 'bus1',
        title: 'Infotainment system',
        price: 60,
      },
      {
        id: 'bus2',
        title: 'Order meal',
        price: 110,
      },
      {
        id: 'bus3',
        title: 'Choose seats',
        price: 200,
      },
      {
        id: 'bus4',
        title: 'turn on the guide',
        price: 300,
      },
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: 'train1',
        title: 'Order a breakfast',
        price: 130,
      },
      {
        id: 'train2',
        title: 'Extra baggage',
        price: 90,
      },
      {
        id: 'train3',
        title: 'Order meal',
        price: 140,
      },
      {
        id: 'train4',
        title: 'Wake up at a certain time',
        price: 100,
      },
    ]
  },
  {
    type: 'ship',
    offers: [
      {
        id: 'ship1',
        title: 'Choose meal',
        price: 140,
      },
      {
        id: 'ship2',
        title: 'Choose seats',
        price: 170,
      },
      {
        id: 'ship3',
        title: 'Business lounge',
        price: 80,
      },
      {
        id: 'ship4',
        title: 'Add luggage',
        price: 120,
      },
      {
        id: 'ship5',
        title: 'Extra luggage',
        price: 200,
      },
      {
        id: 'ship6',
        title: 'Upgrade to business class',
        price: 210,
      },
      {
        id: 'ship7',
        title: 'Switch to comfort class',
        price: 110,
      },
    ]
  },
  {
    type: 'transport',
    offers: [],
  },
  {
    type: 'drive',
    offers: [
      {
        id: 'drive1',
        title: 'Choose comfort class',
        price: 120,
      },
      {
        id: 'drive2',
        title: 'Choose business class',
        price: 220,
      },
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: 'flight1',
        title: 'Add luggage',
        price: 150,
      },
      {
        id: 'flight2',
        title: 'Upgrade to comfort class',
        price: 200,
      },
      {
        id: 'flight3',
        title: 'Upgrade to business class',
        price: 250,
      },
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 'checkIn1',
        title: 'Choose the time of check-in',
        price: 90,
      }
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: 'sightseeing1',
        title: 'turn on the guide',
        price: 220,
      }
    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: 'restaurant1',
        title: 'Choose VIP area',
        price: 70,
      },
      {
        id: 'restaurant2',
        title: 'Choose live music',
        price: 130,
      },
    ]
  },
];

const getMockOffers = () => mockOffers;

export {getMockOffers};
