import {RenderPosition, render} from '../render.js';

import TripInfo from '../view/trip-info.js';
import FilterView from '../view/filters.js';
import SortView from '../view/sort.js';
import Events from '../view/events.js';
import AddEventView from '../view/add-trip-event.js';
import EditEventView from '../view/edit-trip-event.js';
import EventsPoint from '../view/events-point.js';

export default class BoardPresenter {

  eventListComponent = new Events();

  constructor ({boardContainer, routeModel}) {
    this.boardContainer = boardContainer;
    this.bodyHeaderTripMain = this.boardContainer.querySelector('.trip-main');
    this.siteControlFilters = this.boardContainer.querySelector('.trip-controls__filters');
    this.siteControlTripEvents = this.boardContainer.querySelector('.trip-events');

    this.routeModel = routeModel;
  }

  init () {
    this.boardPoints = [...this.routeModel.getPoints()];
    this.boardOffers = [...this.routeModel.getOffers()];
    this.boardDestinations = [...this.routeModel.getDestinations()];

    render(new TripInfo(), this.bodyHeaderTripMain, RenderPosition.AFTERBEGIN);
    render(new FilterView(), this.siteControlFilters);
    render(new SortView(), this.siteControlTripEvents);

    render(this.eventListComponent, this.siteControlTripEvents);

    render(new AddEventView({points:this.boardPoints,destinations:this.boardDestinations,offers:this.boardOffers}), this.eventListComponent.getElement());

    const editCurrentPoint = this.boardPoints[1];
    const editDestinationPoint = this.boardDestinations.find((item) => item.id === editCurrentPoint.destination);
    const editOffersByType = this.boardOffers.find((item) => item.type === editCurrentPoint.type);

    render(new EditEventView({point:editCurrentPoint,destination:editDestinationPoint,offers:editOffersByType}), this.eventListComponent.getElement());

    for (let i = 1; i < this.boardPoints.length; i++) {
      const currentPoint = this.boardPoints[i];
      const pointDestination = this.boardDestinations.find((item) => item.id === currentPoint.destination);
      const destinationName = `${currentPoint.type} ${pointDestination.name}`;
      const offerListByTypePoint = this.boardOffers.find((item) => item.type === currentPoint.type);
      const currentOfferList = offerListByTypePoint.offers.filter((offer) => currentPoint.offers.find((item) => offer.id === item));

      render(new EventsPoint({point:currentPoint, destinationName: destinationName, currentOfferList: currentOfferList}), this.eventListComponent.getElement());
    }
  }
}
