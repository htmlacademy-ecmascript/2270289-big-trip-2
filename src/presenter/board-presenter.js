import {RenderPosition,render,remove} from '../framework/render.js';

import {SortType, UpdateType, UserAction, FilterType} from '../consts.js';
import {sortPointDay,sortPointTime,sortPointPrice} from '../utils/point.js';

import {FiltersMap} from '../utils/filters.js';
import FilterPresenter from '../presenter/filter-presenter.js';
import PointPresenter from './point-presenter.js';
import AddPointPresenter from '../presenter/add-point-presenter.js';

import TripInfoView from '../view/trip-info-view.js';
import SortView from '../view/sort-view.js';
import EventsView from '../view/events-view.js';
import EmptyPointView from '../view/empty-point-view.js';

export default class BoardPresenter {
  #boardContainer = null;
  #routeModel = null;
  #filterModel = null;

  #boardOffers = [];
  #boardDestinations = [];
  #boardRouteTravel = [];

  #bodyHeaderTripMain = null;
  #siteControlFilters = null;
  #siteControlTripEvents = null;

  #pointPresenterMap = new Map();
  #pointPresenter = null;
  #addPointPresenter = null;
  #filterPresenter = null;


  #tripInfoComponent = null;
  #sortComponent = null;
  #eventListComponent = new EventsView();
  #emptyListComponent = null;

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

  constructor ({boardContainer, routeModel, filterModel, onAddPointDestroy}) {

    this.#boardContainer = boardContainer;

    this.#bodyHeaderTripMain = this.#boardContainer.querySelector('.trip-main');
    this.#siteControlFilters = this.#boardContainer.querySelector('.trip-controls__filters');
    this.#siteControlTripEvents = this.#boardContainer.querySelector('.trip-events');

    this.#routeModel = routeModel;
    this.#filterModel = filterModel;

    this.#addPointPresenter = new AddPointPresenter({
      pointListContainer: this.#eventListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onAddPointDestroy
    });

    this.#routeModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points () {
    this.#filterType = this.#filterModel.filter;
    const points = this.#routeModel.points;
    const filteredPoints = FiltersMap[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortPointTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortPointPrice);
    }
    return filteredPoints.sort(sortPointDay);
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#addPointPresenter.init(this.#boardOffers, this.#boardDestinations);
  }

  #handleViewAction = (actionType, updateType, update) => {
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch(actionType) {
      case UserAction.UPDATE_POINT:
        this.#routeModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#routeModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#routeModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
    //console.log('пришли в #handleModelEvent');
    //console.log('updateType',updateType);
    //console.log('data',data);
    switch(updateType) {
      case UpdateType.PATCH:
        this.#pointPresenterMap.get(data.id).init(data, this.#boardOffers, this.#boardDestinations);
        break;
      case UpdateType.MINOR:
        //console.log('Зашли в MINOR');
        this.#clearTripBoard({resetSortType: true});
        this.#renderSort();
        this.#renderPointEvents();
        break;
      case UpdateType.MAJOR:
        this.#clearTripBoard({resetSortType: true});
        this.#renderSort();
        this.#renderPointEvents();
        break;
    }
  };

  init () {
    this.#boardOffers = [...this.#routeModel.offers];
    this.#boardDestinations = [...this.#routeModel.destinations];
    this.#boardRouteTravel = [...this.#routeModel.routeTravel];

    this.#renderBoard();
  }

  #renderBoard = () => {
    this.#renderTripInfo(this.#boardRouteTravel,'18','20 Mar',1230);
    this.#renderFilter();
    this.#renderSort();
    this.#renderPointEvents();
  };

  #renderTripInfo (boardRouteTravel,beginDate,endDate,costValue) {
    this.#tripInfoComponent = new TripInfoView({
      routeTravel: boardRouteTravel,
      beginDate: beginDate,
      endDate: endDate,
      costValue: costValue});

    render(this.#tripInfoComponent,this.#bodyHeaderTripMain, RenderPosition.AFTERBEGIN);
  };

  #renderFilter() {
    this.#filterPresenter = new FilterPresenter({
      filterContainer: this.#siteControlFilters,
      filterModel: this.#filterModel,
      routeModel: this.#routeModel,
    });
    this.#filterPresenter.init();
  };

  #renderSort() {
    this.#sortComponent = new SortView({currentSortType: this.#currentSortType, onSortByType: this.#handleSortByType});
    render(this.#sortComponent, this.#siteControlTripEvents);
  };

  #renderPointEvents () {
    render(this.#eventListComponent, this.#siteControlTripEvents);

    const pointsLength = this.points.length;
    const points = this.points.slice(0, pointsLength);

    if (pointsLength === 0) {
      this.#renderEmptyList();
    } else {
      points.forEach((itemPoint) => {
        const pointPresenter = new PointPresenter({
          placeRenderList: this.#eventListComponent,
          onModeChange: this.#handleModeChange,
          onDataChange: this.#handleViewAction
        });
        //console.log(' - - - - - - - - - - - - - - - - -');
        //console.log('itemPoint',itemPoint);
        pointPresenter.init(itemPoint,this.#boardDestinations,this.#boardOffers);
        this.#pointPresenterMap.set(itemPoint.id,pointPresenter);
      });
    };
  };


  #handleModeChange = () => {
    if (this.#addPointPresenter) {
      this.#addPointPresenter.destroy();
    };
    this.#pointPresenterMap.forEach((presenter) => presenter.resetView());
  };

#renderEmptyList (){
  this.#emptyListComponent = new EmptyPointView({filterType: this.#filterType});
  render(this.#emptyListComponent,  this.#siteControlTripEvents);
}

#clearTripBoard({resetSortType = false} = {}) {
  this.#pointPresenterMap.forEach((presenter) => presenter.destroy());
  this.#pointPresenterMap.clear();
  this.#addPointPresenter.destroy();

  remove(this.#sortComponent);
  remove(this.#emptyListComponent);

  this.#currentSortType = (resetSortType) ? SortType.DAY : this.#currentSortType;
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
    //this.#sortPoints(sortType);
    this.#clearPointEvents();
    this.#renderPointEvents();
  };

  #clearPointEvents () {
    this.#pointPresenterMap.forEach((presenter) => presenter.destroy());
    this.#pointPresenterMap.clear();
  };

};


