import {RenderPosition, render} from '../render.js';

import NewTripInfo from '../view/new-trip-info.js';
import NewFilterView from '../view/new-filters.js';
import NewListSortView from '../view/new-list-sort.js';
import NewListEvents from '../view/new-list-events-view.js';
import NewAddEventView from '../view/add-trip-event-view.js';
import NewEditEventView from '../view/edit-trip-event-view.js';
import NewListEventsPoint from '../view/list-events-point-view.js';

export default class BoardPresenter {

  eventListComponent = new NewListEvents();

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
    //console.log(this.boardDestinations);
    //console.log(this.boardOffers);

    render(new NewTripInfo(), this.bodyHeaderTripMain, RenderPosition.AFTERBEGIN);
    render(new NewFilterView(), this.siteControlFilters);
    render(new NewListSortView(), this.siteControlTripEvents);

    render(this.eventListComponent, this.siteControlTripEvents);

    render(new NewAddEventView({points:this.boardPoints,destinations:this.boardDestinations,offers:this.boardOffers}), this.eventListComponent.getElement());

    const editCurrentPoint = this.boardPoints[1];
    const editDestinationPoint = this.boardDestinations.find((item) => item.id === editCurrentPoint.destination);
    const editOffersByType = this.boardOffers.find((item) => item.type === editCurrentPoint.type);

    render(new NewEditEventView({point:editCurrentPoint,destination:editDestinationPoint,offers:editOffersByType}), this.eventListComponent.getElement());

    for (let i = 1; i < this.boardPoints.length; i++) {
      const currentPoint = this.boardPoints[i];
      const pointDestination = this.boardDestinations.find((item) => item.id === currentPoint.destination);
      const destinationName = `${currentPoint.type} ${pointDestination.name}`;
      const offerListByTypePoint = this.boardOffers.find((item) => item.type === currentPoint.type);
      const currentOfferList = offerListByTypePoint.offers.filter((offer) => currentPoint.offers.find((item) => offer.id === item));

      render(new NewListEventsPoint({point:currentPoint, destinationName: destinationName, currentOfferList: currentOfferList}), this.eventListComponent.getElement());
    }
  }
}
