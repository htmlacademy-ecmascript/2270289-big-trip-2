import Observable from '../framework/observable.js';

import {getMockPoint,getRandomPoint,getRandomUniquePoint} from '../mock/points.js';
import {getMockOffers} from '../mock/offers.js';
import {getMockDestinations} from '../mock/destinations.js';
import {getRandomInteger} from '../utils/utils.js';
import {pathPointMap} from '../consts.js';

const POINT_COUNT = 3;

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

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) throw new Error('Can\'t update unexisting point');

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) throw new Error('Can\'t delete unexisting point');

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }


}
