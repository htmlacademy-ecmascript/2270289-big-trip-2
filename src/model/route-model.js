import {getMockPoint,getRandomPoint} from '../mock/points.js';
import {getMockOffers} from '../mock/offers.js';
import {getMockDestinations} from '../mock/destinations.js';
import {getRandomInteger} from '../utils/utils.js';
import {pathPointMap} from '../consts.js';

const POINT_COUNT = 4;

export default class RouteModel {
  #randomPoints = Array.from({length: getRandomInteger(POINT_COUNT)}, getRandomPoint);
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
