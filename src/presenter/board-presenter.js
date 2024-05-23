import {RenderPosition,render} from '../framework/render.js';

import TripInfoView from '../view/trip-info-view.js';
import FilterView from '../view/filters-view.js';
import SortView from '../view/sort-view.js';
import EventsView from '../view/events-view.js';
import AddEventView from '../view/add-trip-event-view.js';
import EditEventView from '../view/edit-trip-event-view.js';
import EventsPointView from '../view/events-point-view.js';

export default class BoardPresenter {
  #boardContainer = null;
  #routeModel = null;

  eventListComponent = new EventsView();

  constructor ({boardContainer, routeModel}) {
    this.#boardContainer = boardContainer;

    this.bodyHeaderTripMain = this.#boardContainer.querySelector('.trip-main');
    this.siteControlFilters = this.#boardContainer.querySelector('.trip-controls__filters');
    this.siteControlTripEvents = this.#boardContainer.querySelector('.trip-events');

    this.#routeModel = routeModel;
  }

  init () {
    this.boardPoints = [...this.#routeModel.points];
    this.boardOffers = [...this.#routeModel.offers];
    this.boardDestinations = [...this.#routeModel.destinations];

    render(new TripInfoView(), this.bodyHeaderTripMain, RenderPosition.AFTERBEGIN);
    render(new FilterView(), this.siteControlFilters);
    render(new SortView(), this.siteControlTripEvents);

    render(this.eventListComponent, this.siteControlTripEvents);

    render(new AddEventView({points:this.boardPoints,destinations:this.boardDestinations,offers:this.boardOffers}), this.eventListComponent.element);

    const editCurrentPoint = this.boardPoints[1];
    const editDestinationPoint = this.boardDestinations.find((item) => item.id === editCurrentPoint.destination);
    const editOffersByType = this.boardOffers.find((item) => item.type === editCurrentPoint.type);

    render(new EditEventView({point:editCurrentPoint,destination:editDestinationPoint,offers:editOffersByType}), this.eventListComponent.element);

    for (let i = 1; i < this.boardPoints.length; i++) {
      const currentPoint = this.boardPoints[i];
      const pointDestination = this.boardDestinations.find((item) => item.id === currentPoint.destination);
      const destinationName = `${currentPoint.type} ${pointDestination.name}`;
      const offerListByTypePoint = this.boardOffers.find((item) => item.type === currentPoint.type);
      const currentOfferList = offerListByTypePoint.offers.filter((offer) => currentPoint.offers.find((item) => offer.id === item));

      render(new EventsPointView({point:currentPoint, destinationName: destinationName, currentOfferList: currentOfferList}), this.eventListComponent.element);
    }
  }
}
