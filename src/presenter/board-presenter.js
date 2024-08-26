import {RenderPosition,render,remove} from '../framework/render.js';
//import {updateItem} from '../utils/common.js';

import {SortType, UpdateType, UserAction, FilterType} from '../consts.js';
import {sortPointDay,sortPointTime,sortPointPrice} from '../utils/point.js';

import {FiltersMap} from '../utils/filters.js';
import FilterPresenter from '../presenter/filter-presenter.js';
import AddPointPresenter from '../presenter/add-point-presenter.js';

import TripInfoView from '../view/trip-info-view.js';
//import FilterView from '../view/filters-view.js';
import SortView from '../view/sort-view.js';
import EventsView from '../view/events-view.js';
import PointPresenter from './point-presenter.js';
import EmptyPointView from '../view/empty-point-view.js';

export default class BoardPresenter {
  #boardContainer = null;
  #routeModel = null;
  #filterModel = null;

  //#boardPoints = [];
  #boardOffers = [];
  #boardDestinations = [];
  #boardRouteTravel = [];

  #bodyHeaderTripMain = null;
  #siteControlFilters = null;
  #siteControlTripEvents = null;

  #pointPresenterMap = new Map();
  #addPointPresenter = null;
  #filterPresenter = null;
  #pointPresenter = null;

  #tripInfoComponent = null;
  #filterComponent = null;
  #sortComponent = null;
  #eventListComponent = new EventsView();
  #emptyListComponent = null;

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  //#sourcedBoardPoints = [];

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
    const points = this.#routeModel.randomUniquePoints;
    const filteredPoints = FiltersMap[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortPointTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortPointPrice);
    }
    return filteredPoints.sort(sortPointDay);
  }

/*
  get points () {
    switch (this.#currentSortType) {
      case SortType.TIME:
        return [...this.#routeModel.points].sort(sortPointTime);
      case SortType.PRICE:
        return [...this.#routeModel.points].sort(sortPointPrice);
    }
    return this.#routeModel.points.sort(sortPointDay);
  }
*/
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
    switch(updateType) {
      case UpdateType.PATCH:
        this.#pointPresenterMap.get(data.id).init(data, this.#boardOffers, this.#boardDestinations);
        break;
      case UpdateType.MINOR:
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
    //this.#boardPoints = [...this.#routeModel.randomUniquePoints];
    this.#boardOffers = [...this.#routeModel.offers];
    this.#boardDestinations = [...this.#routeModel.destinations];
    this.#boardRouteTravel = [...this.#routeModel.routeTravel];

    // 1. В отличии от сортировки по любому параметру, исходный порядок можно сохранить
    // только одним способом - сохранив исходный массив:
    //this.#sourcedBoardPoints = [...this.#boardPoints];

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
//    this.#filterComponent = new FilterView();
//    {filters, currentFilterType, onFilterTypeChange}
//    render(this.#filterComponent, this.#siteControlFilters);
    const filterPresenter = new FilterPresenter({
      filterContainer: this.#siteControlFilters,
      filterModel: this.#filterModel,
      routeModel: this.#routeModel,
    });
    filterPresenter.init();
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
      //render(new EmptyPointView(), this.#siteControlTripEvents);
      this.#renderEmptyList();
    } else {
      points.forEach((itemPoint) => {
        const pointPresenter = new PointPresenter({
          point:itemPoint,
          destinations: this.#boardDestinations,
          offers: this.#boardOffers,
          placeRenderList: this.#eventListComponent,
          onModeChange: this.#handleModeChange,
          //onDataChange: this.#handleUpdatePoint
          onDataChange: this.#handleViewAction
        });
        this.#pointPresenterMap.set(itemPoint.id,pointPresenter);
        pointPresenter.init(itemPoint,this.#boardDestinations,this.#boardOffers);
      });
    };
  };

  #handleModeChange = () => {
    this.#pointPresenterMap.forEach((presenter) => presenter.resetView());
  };

/*
  #handleUpdatePoint = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);
    this.#pointPresenterMap.get(updatedPoint.id).init(updatedPoint, this.#boardDestinations, this.#boardOffers);
  };
*/
/*
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
*/

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


