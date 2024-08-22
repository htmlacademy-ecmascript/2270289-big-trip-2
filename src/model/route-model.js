import Observable from '../framework/observable.js';

import {getMockPoint,getRandomPoint,getRandomUniquePoint} from '../mock/points.js';
import {getMockOffers} from '../mock/offers.js';
import {getMockDestinations} from '../mock/destinations.js';
import {getRandomInteger} from '../utils/utils.js';
import {pathPointMap} from '../consts.js';

const POINT_COUNT = 7;

export default class RouteModel extends Observable {
  #randomPoints = Array.from({length: getRandomInteger(POINT_COUNT)}, getRandomPoint);
  #randomUniquePoints = getRandomUniquePoint(POINT_COUNT);
  #points = getMockPoint();
  #offers = getMockOffers();
  #destinations = getMockDestinations();

  #pathPointMap = pathPointMap;


  get points() {
    return this.#points;
  }

  get randomPoints() {
    return this.#randomPoints;
  }

  get randomUniquePoints() {
    return this.#randomUniquePoints;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  get routeTravel() {
    return this.#pathPointMap;
  }
}
