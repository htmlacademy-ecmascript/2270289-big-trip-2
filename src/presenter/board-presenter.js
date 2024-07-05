import {RenderPosition,render} from '../framework/render.js';
import {updateItem} from '../utils/common.js';

import TripInfoView from '../view/trip-info-view.js';
import FilterView from '../view/filters-view.js';
import SortView from '../view/sort-view.js';
import EventsView from '../view/events-view.js';
import PointPresenter from './point-presenter.js';
import EmptyPointView from '../view/empty-point-view.js';

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
  //#pointPresenter = null;

  #eventListComponent = new EventsView();

  #pointPresenterMap = new Map();

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
    render(this.#eventListComponent, this.#siteControlTripEvents);

    if (this.#boardPoints.length === 0) {
      render(new EmptyPointView(), this.#siteControlTripEvents);
    } else {
      for (let i = 0; i < this.#boardPoints.length; i++) {
        const pointPresenter = new PointPresenter({
          point:this.#boardPoints[i],
          destinations: this.#boardDestinations,
          offers: this.#boardOffers,
          placeRenderList: this.#eventListComponent,
          onModeChange: this.#handleModeChange,
          onDataChange: this.#handleUpdatePoint
          });
        //
        this.#pointPresenterMap.set(this.#boardPoints[i].id,pointPresenter)
        pointPresenter.init(this.#boardPoints[i],this.#boardDestinations,this.#boardOffers);
      }
    };

  }

  #handleModeChange = () => {
    this.#pointPresenterMap.forEach((presenter) => presenter.resetView());
  };

  #handleUpdatePoint = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#pointPresenterMap.get(updatedPoint.id).init(updatedPoint, this.#boardDestinations, this.#boardOffers);
  };



};


