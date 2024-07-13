const mockDestinations = [
  {
    id: 'dest-Amsterdam',
    description: 'Amsterdam, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Amsterdam',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=100',
        description: 'About Amsterdam 1'
      },
      {
        src: 'https://loremflickr.com/248/152?random=200',
        description: 'About Amsterdam 2'
      },
      {
        src: 'https://loremflickr.com/248/152?random=300',
        description: 'About Amsterdam 3'
      },
    ]
  },
  {
    id: 'dest-Chamonix',
    description: `Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France,
                  Switzerland and Italy. At the base of Mont Blanc, the highest summit in the Alps, it's renowned for its skiing.`,
    name: 'Chamonix',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=10',
        description: 'About Chamonix parliament building'
      },
      {
        src: 'https://loremflickr.com/248/152?random=20',
        description: 'About Chamonix parliament building'
      },
    ]
  },
  {
    id: 'dest-Geneva',
    description: 'Geneva, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Geneva',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=100',
        description: 'About Geneva building'
      }
    ]
  },
  {
    id: 'dest-Omsk',
    description: 'Omsk, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Omsk',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=234',
        description: 'About Omsk picture 1'
      },
      {
        src: 'https://loremflickr.com/248/152?random=334',
        description: 'About Omsk picture 2'
      },
      {
        src: 'https://loremflickr.com/248/152?random=434',
        description: 'About Omsk picture 3'
      },
    ]
  },
  {
    id: 'dest-Washington',
    description: 'Washington is a resort area near the junction of USA. At the base of Mont Blanc, the highest summit in the Alps, it\'s renowned for its skiing.',
    name: 'Washington',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=10',
        description: 'About Washington parliament building'
      },
      {
        src: 'https://loremflickr.com/248/152?random=20',
        description: 'About Washington parliament building'
      },
      {
        src: 'https://loremflickr.com/248/152?random=30',
        description: 'About Washington parliament building'
      },
    ]
  },
  {
    id: 'dest-Moscow',
    description: 'Moscow, is a beautiful city, with crowded streets.',
    name: 'Moscow',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=234',
        description: 'About Moscow picture 1'
      },
      {
        src: 'https://loremflickr.com/248/152?random=334',
        description: 'About Moscow picture 2'
      },
      {
        src: 'https://loremflickr.com/248/152?random=534',
        description: 'About Moscow picture 3'
      },
      {
        src: 'https://loremflickr.com/248/152?random=634',
        description: 'About Moscow picture 3'
      },
    ]
  },

];

const getMockDestinations = () => mockDestinations;

export {getMockDestinations};
