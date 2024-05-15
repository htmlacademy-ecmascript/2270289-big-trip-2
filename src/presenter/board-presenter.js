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

    render(new NewTripInfo(), this.bodyHeaderTripMain, RenderPosition.AFTERBEGIN);
    render(new NewFilterView(), this.siteControlFilters);
    render(new NewListSortView(), this.siteControlTripEvents);

    render(this.eventListComponent, this.siteControlTripEvents);

    render(new NewAddEventView(), this.eventListComponent.getElement());
    render(new NewEditEventView(), this.eventListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new NewListEventsPoint(), this.eventListComponent.getElement());
    }
  }
}
