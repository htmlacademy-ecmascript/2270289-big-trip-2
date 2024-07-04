import {RenderPosition,render,replace} from '../framework/render.js';

import TripInfoView from '../view/trip-info-view.js';
import FilterView from '../view/filters-view.js';
import SortView from '../view/sort-view.js';
import EventsView from '../view/events-view.js';
import PoinPresenter from './point-presenter.js';

export default class BoardPresenter {
  #boardContainer = null;
  #routeModel = null;

  #boardPoints = [];
  #boardOffers = [];
  #boardDestinations = [];

  #boardRouteTravel = [];

  #bodyHeaderTripMain = null;
  #siteControlFilters = null;
  #siteControlTripEvents = null;

  eventListComponent = new EventsView();

  constructor ({boardContainer, routeModel}) {
    this.#boardContainer = boardContainer;

    this.#bodyHeaderTripMain = this.#boardContainer.querySelector('.trip-main');
    this.#siteControlFilters = this.#boardContainer.querySelector('.trip-controls__filters');
    this.#siteControlTripEvents = this.#boardContainer.querySelector('.trip-events');

    this.#routeModel = routeModel;
  }

  init () {
    this.#boardPoints = [...this.#routeModel.randomPoints];
    this.#boardOffers = [...this.#routeModel.offers];
    this.#boardDestinations = [...this.#routeModel.destinations];
    this.#boardRouteTravel = [...this.#routeModel.routeTravel];

    render(new TripInfoView({
      routeTravel: this.#boardRouteTravel,
      beginDate: '18',
      endDate: '20 Mar',
      costValue: 1230}),
    this.#bodyHeaderTripMain,
    RenderPosition.AFTERBEGIN);

    render(new FilterView(), this.#siteControlFilters);
    render(new SortView(), this.#siteControlTripEvents);
    render(this.eventListComponent, this.#siteControlTripEvents);

  }

}
