function getRandomInteger(limitNumber) {
  return Math.floor(Math.random() * limitNumber);
}

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export {getRandomArrayElement,getRandomInteger};
