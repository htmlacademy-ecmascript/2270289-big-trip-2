import {render,replace,remove} from '../framework/render.js';
import {Mode} from '../consts.js';

import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';

export default class PointPresenter {
  #point = null;
  #destinations = null;
  #offers = null;
  #placeRenderList = null;

  #pointComponent = null;
  #editPointComponent = null;

  #pointsMode = Mode.DEFAULT;

  #handleModeChange = null;
  #handleDataChange = null;

  constructor ({placeRenderList,onModeChange,onDataChange}) {
    this.#placeRenderList = placeRenderList;
    this.#handleModeChange = onModeChange;
    this.#handleDataChange = onDataChange;
  }

  /**
   * @param {string} mode 'DEFAULT','EDITING'
   */
  set pointsMode (mode) {
    this.#pointsMode = mode;
    return
  };

  get pointsMode() {
    return this.#pointsMode;
  };

  init(point,destinations,offers) {
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    const pointDestination = this.#destinations.find((item) => item.id === this.#point.destination);
    const destinationName = `${this.#point.type} ${pointDestination.name}`;

    const offerListByTypePoint = this.#offers.find((item) => item.type === this.#point.type);
    const currentOfferList = offerListByTypePoint.offers.filter((offer) => this.#point.offers.find((item) => offer.id === item));

    this.#pointComponent = new PointView({point:this.#point,
      destinationName: destinationName,
      currentOfferList: currentOfferList,
      onClickButtonArrow: () => {
        this.#replacePointToEditPoint();
        document.addEventListener('keydown',this.#escKeyDownHandler);
      },
      onClickCheckFavorite: () => {
        this.#handleCheckFavoriteClick();
      }
    });

    this.#editPointComponent = new EditPointView({
      point:this.#point,
      allDestinations: this.#destinations,
      allOffers: this.#offers,
      onEditFormButtonSave: () => {
        this.#replaceEditPointToPoint();
        document.removeEventListener('keydown',this.#escKeyDownHandler);
      },
      onEditFormButtonArrow: () => {
        this.#replaceEditPointToPoint();
        document.removeEventListener('keydown',this.#escKeyDownHandler);
      },
      onEditFormButtonCancel: this.#handleFormButtonCancel,
      buttonText: 'Delete',
      isAddPoint: false,
    });

    const isEditPoint = this.#checkPointsOnEditStatus(this.#placeRenderList.element);
    console.log('isEditPoint',isEditPoint);

    if ((prevPointComponent === null || prevEditPointComponent === null) && isEditPoint === null) {
      render(this.#pointComponent, this.#placeRenderList.element);
      return;
    }

    if (this.pointsMode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.pointsMode === Mode.EDITING) {
      replace(this.#editPointComponent, prevEditPointComponent);
    }
    remove(prevPointComponent);
    remove(prevEditPointComponent);
  };

  #checkPointsOnEditStatus = (pointListContainer) => {
    return pointListContainer.querySelector('.event--edit')
  }

 /**
 * Функция обработки нажатия на клавишу Escape, на клавиатуре.
 */
 #handleFormButtonCancel = (evt) => {
  evt.preventDefault();
  this.destroy();
};

  #escKeyDownHandler = (evt) => {
    if ((evt.key === 'Escape') || (evt.key === 'Esc')) {
      evt.preventDefault();
      this.#editPointComponent.reset(this.#point);
      this.#replaceEditPointToPoint();
      document.removeEventListener('keydown',this.#escKeyDownHandler);
    };
  };

  /**
 * Функция перевода точки маршрута в режим редактирования.
 */
  #replacePointToEditPoint(){
    replace(this.#editPointComponent, this.#pointComponent);
    this.#handleModeChange(); // Используется для сброса состояния всех точек, чтоб толька одна точка была в режиме редактирования.
    console.log(this.pointsMode);
    this.pointsMode = Mode.EDITING;
  };

/**
 * Функция замены формы редактирования на точку...
 */
  #replaceEditPointToPoint(){
    replace(this.#pointComponent, this.#editPointComponent);
    this.pointsMode = Mode.DEFAULT;
  };

/**
 * Функция удаления предыдущих компонентов.
 */
  destroy() {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  };

/**
 * Функция сброса всех точек в исходное состояние, если какая-то находится в режиме редактирования.
 */
  resetView() {
    if (this.pointsMode !== Mode.DEFAULT) {
      this.#editPointComponent.reset(this.#point);
      this.#replaceEditPointToPoint();
    };
  };

  #handleCheckFavoriteClick = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };

}
