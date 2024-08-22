import {RenderPosition,render,remove} from '../framework/render.js';
import {updateItem} from '../utils/common.js';

import TripInfoView from '../view/trip-info-view.js';
import FilterView from '../view/filters-view.js';
import SortView from '../view/sort-view.js';
import EventsView from '../view/events-view.js';
import PointPresenter from './point-presenter.js';
import EmptyPointView from '../view/empty-point-view.js';

import {SortType} from '../consts.js';
import {sortPointDay,sortPointTime,sortPointPrice} from '../utils/point.js';


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

  #pointPresenterMap = new Map();

  #tripInfoComponent = null;
  #filterComponent = null;
  #sortComponent = null;
  #eventListComponent = new EventsView();
  //#pointPresenter = null;

  #currentSortType = SortType.DAY;
  #sourcedBoardPoints = [];

  constructor ({boardContainer, routeModel}) {
    this.#boardContainer = boardContainer;

    this.#bodyHeaderTripMain = this.#boardContainer.querySelector('.trip-main');
    this.#siteControlFilters = this.#boardContainer.querySelector('.trip-controls__filters');
    this.#siteControlTripEvents = this.#boardContainer.querySelector('.trip-events');

    this.#routeModel = routeModel;
  }

  init () {
    this.#boardPoints = [...this.#routeModel.randomUniquePoints];
    this.#boardOffers = [...this.#routeModel.offers];
    this.#boardDestinations = [...this.#routeModel.destinations];
    this.#boardRouteTravel = [...this.#routeModel.routeTravel];

    // 1. В отличии от сортировки по любому параметру, исходный порядок можно сохранить
    // только одним способом - сохранив исходный массив:
    this.#sourcedBoardPoints = [...this.#boardPoints];

    this.#renderTripInfo();
    this.#renderFilter();
    this.#renderSort();
    this.#renderPointEvents();

  }

  get points () {
    return this.#routeModel.points;
  }

  #handleModeChange = () => {
    this.#pointPresenterMap.forEach((presenter) => presenter.resetView());
  };

  #handleUpdatePoint = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);
    this.#pointPresenterMap.get(updatedPoint.id).init(updatedPoint, this.#boardDestinations, this.#boardOffers);
  };

  #sortPoints(sortType) {
    // 2. Этот исходный массив задач необходим,
    // потому что для сортировки мы будем мутировать
    // массив в свойстве _boardPoints
    switch (sortType) {
      case SortType.DAY:
        this.#boardPoints.sort(sortPointDay);
        break;
      case SortType.TIME:
        this.#boardPoints.sort(sortPointTime);
        break;
      case SortType.PRICE:
        this.#boardPoints.sort(sortPointPrice);
        break;
      default:
        // 3. А когда пользователь захочет "вернуть всё, как было",
        // мы просто запишем в _boardTasks исходный массив
        this.#boardPoints = [...this.#sourcedBoardPoints];
    }
    this.#currentSortType = sortType;
  }

  #handleSortByType = (sortType) => {
    // - Сортируем задачи
    // - Очищаем список
    // - Рендерим список заново
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    remove(this.#sortComponent);
    this.#renderSort();
    this.#sortPoints(sortType);
    this.#clearPointEvents();
    this.#renderPointEvents();
  };

  #clearPointEvents () {
    this.#pointPresenterMap.forEach((presenter) => presenter.destroy());
    this.#pointPresenterMap.clear();
  };

  #renderPointEvents () {
    render(this.#eventListComponent, this.#siteControlTripEvents);

    if (this.#boardPoints.length === 0) {
      render(new EmptyPointView(), this.#siteControlTripEvents);
    } else {
      this.#boardPoints.forEach((itemPoint) => {
        const pointPresenter = new PointPresenter({
          point:this.itemPoint,
          destinations: this.#boardDestinations,
          offers: this.#boardOffers,
          placeRenderList: this.#eventListComponent,
          onModeChange: this.#handleModeChange,
          onDataChange: this.#handleUpdatePoint
        });
        this.#pointPresenterMap.set(itemPoint.id,pointPresenter);
        pointPresenter.init(itemPoint,this.#boardDestinations,this.#boardOffers);
      });
    };
  };

  #renderSort() {
    this.#sortComponent = new SortView({currentSortType: this.#currentSortType, onSortByType: this.#handleSortByType});
    render(this.#sortComponent, this.#siteControlTripEvents);
  };

  #renderFilter() {
    this.#filterComponent = new FilterView();
    render(this.#filterComponent, this.#siteControlFilters);
  };

  #renderTripInfo () {
    this.#tripInfoComponent = new TripInfoView({
      routeTravel: this.#boardRouteTravel,
      beginDate: '18',
      endDate: '20 Mar',
      costValue: 1230});

    render(this.#tripInfoComponent,this.#bodyHeaderTripMain, RenderPosition.AFTERBEGIN);
  };

};


