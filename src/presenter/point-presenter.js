import {render,replace,remove} from '../framework/render.js';
import {Mode} from '../consts.js';

import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';


export default class PointPresenter {
  #point = null;
  #destinations = null;
  #offers = null;
  #placeRenderList =null;

  #pointComponent = null;
  #editPointComponent = null;
  #newPointComponent = null;

  #mode = Mode.DEFAULT;
  #handleModeChange = null;
  #handleDataChange = null;

  constructor ({point,destinations,offers,placeRenderList,onModeChange,onDataChange}) {
    this.#point = point;
    this.#destinations =destinations;
    this.#offers = offers;
    this.#placeRenderList = placeRenderList;

    this.#handleModeChange = onModeChange;
    this.#handleDataChange = onDataChange;
  }

  init(point,destinations,offers) {
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    console.log('this.#point');
    console.log(this.#point);

    //const pointDestination = this.#destinations.find((item) => item.id === this.#point.destination);
    const destinationName = `${this.#point.type} ${this.#destinations.name}`;
    const offerListByTypePoint = this.#offers.find((item) => item.type === this.#point.type);
    const currentOfferList = offerListByTypePoint.offers.filter((offer) => this.#point.offers.find((item) => offer.id === item));

    this.#pointComponent = new PointView({point:this.#point,
      destinationName: destinationName,
      currentOfferList: currentOfferList,
      onClickButtonArrow: () => {
        this.#replacePointToEditPoint();
        document.addEventListener('keydown',this.#escKeyDownHandler)
      },
      onClickCheckFavorite: () => {
        this.#handleCheckFavoriteClick();
      }
    })

    const editDestinationPoint = this.#destinations.find((item) => item.id === this.#point.destination);
    const editOffersByType = this.#offers.find((item) => item.type === this.#point.type);

    this.#editPointComponent = new EditPointView({point:this.#point,
      destination:editDestinationPoint,
      offers:editOffersByType,
      onEditFormButtonSave: () => {
        this.#replaceEditPointToPoint();
        document.removeEventListener('keydown',this.#escKeyDownHandler);
      },
      onEditFormButtonArrow: () => {
        this.#replaceEditPointToPoint();
        document.removeEventListener('keydown',this.#escKeyDownHandler);
      }
    });

    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this.#pointComponent, this.#placeRenderList.element);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editPointComponent, prevEditPointComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);

  }

 /**
 * Функция обработки нажатия на клавишу Escape, на клавиатуре.
 */
  #escKeyDownHandler = (evt) => {
    if ((evt.key === 'Escape') || (evt.key === 'Esc')) {
      evt.preventDefault();
      replaceEditPointToPoint();
      document.removeEventListener('keydown',escKeyDownHandler);
    }
  }

  /**
 * Функция перевода точки маршрута в режим редактирования.
 */
  #replacePointToEditPoint(){
    replace(this.#editPointComponent, this.#pointComponent);
    this.#handleModeChange(); // Используется для сброса состояния всех точек, чтоб толька одна точка была в режиме редактирования.
    this.#mode = Mode.EDITING;
  }

/**
 * Функция замены формы редактирования на точку...
 */
  #replaceEditPointToPoint(){
    replace(this.#pointComponent, this.#editPointComponent);
    this.#mode = Mode.DEFAULT;
  }

/**
 * Функция удаления предыдущих компонентов.
 */
  destroy() {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  }

/**
 * Функция сброса всех точек в исходное состояние, если какая-то находится в режиме редактирования.
 */
  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceEditPointToPoint();
    }
  }

  #handleCheckFavoriteClick = () => {
    console.log(this.#point);
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };

}
