import {RenderPosition,render,replace} from '../framework/render.js';

import TripInfoView from '../view/trip-info-view.js';
import FilterView from '../view/filters-view.js';
import SortView from '../view/sort-view.js';
import EventsView from '../view/events-view.js';
//import AddPointView from '../view/add-point-view.js';
import EmptyPointView from '../view/empty-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';

export default class BoardPresenter {
  #boardContainer = null;
  #routeModel = null;

  #boardPoints = [];
  #boardOffers = [];
  #boardDestinations = [];

  eventListComponent = new EventsView();

  constructor ({boardContainer, routeModel}) {
    this.#boardContainer = boardContainer;

    this.bodyHeaderTripMain = this.#boardContainer.querySelector('.trip-main');
    this.siteControlFilters = this.#boardContainer.querySelector('.trip-controls__filters');
    this.siteControlTripEvents = this.#boardContainer.querySelector('.trip-events');

    this.#routeModel = routeModel;
  }

  init () {
    this.#boardPoints = [...this.#routeModel.randomPoints];
    this.#boardOffers = [...this.#routeModel.offers];
    this.#boardDestinations = [...this.#routeModel.destinations];

    render(new TripInfoView(), this.bodyHeaderTripMain, RenderPosition.AFTERBEGIN);
    render(new FilterView(), this.siteControlFilters);
    render(new SortView(), this.siteControlTripEvents);
    render(this.eventListComponent, this.siteControlTripEvents);

    //render(new AddEventView({points:this.boardPoints,destinations:this.boardDestinations,offers:this.boardOffers}), this.eventListComponent.element);

    console.log(this.#boardPoints);
    console.log('this.#boardPoints.length');
    console.log(this.#boardPoints.length);

    if (this.#boardPoints.length === 0) {
      render(new EmptyPointView(), this.siteControlTripEvents);
    } else {
      for (let i = 0; i < this.#boardPoints.length; i++) {
        this.#renderPoint(this.#boardPoints[i],this.#boardDestinations,this.#boardOffers)
      }
    };

  }

  #renderPoint (currentPoint, boardDestinations, boardOffers) {

    const pointDestination = boardDestinations.find((item) => item.id === currentPoint.destination);
    const destinationName = `${currentPoint.type} ${pointDestination.name}`;
    const offerListByTypePoint = boardOffers.find((item) => item.type === currentPoint.type);
    const currentOfferList = offerListByTypePoint.offers.filter((offer) => currentPoint.offers.find((item) => offer.id === item));

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditPointToPoint();
        document.removeEventListener('keydown',escKeyDownHandler);
      }
    }

    const pointComponent = new PointView({point:currentPoint,
      destinationName: destinationName,
      currentOfferList: currentOfferList,
      onClickButtonArrow: () => {
        replacePointToEditPoint();
        document.addEventListener('keydown',escKeyDownHandler)
      }
    })

    const editCurrentPoint = this.#boardPoints[1];
    const editDestinationPoint = this.#boardDestinations.find((item) => item.id === editCurrentPoint.destination);
    const editOffersByType = this.#boardOffers.find((item) => item.type === editCurrentPoint.type);

    const editPointComponent = new EditPointView({point:currentPoint,
      destination:editDestinationPoint,
      offers:editOffersByType,
      onEditFormButtonSave: () => {
        replaceEditPointToPoint();
        document.removeEventListener('keydown',escKeyDownHandler);
      },
      onEditFormButtonArrow: () => {
        replaceEditPointToPoint();
        document.removeEventListener('keydown',escKeyDownHandler);
      }
    });


    function replacePointToEditPoint(){
      replace(editPointComponent, pointComponent);
    }

    function replaceEditPointToPoint(){
      replace(pointComponent, editPointComponent);
    }

    render(pointComponent, this.eventListComponent.element);

  };

}
