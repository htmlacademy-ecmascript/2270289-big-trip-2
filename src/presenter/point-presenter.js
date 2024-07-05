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

  constructor ({point,destinations,offers,placeRenderList,onDataChange,onModeChange}) {
    this.#point = point;
    this.#destinations =destinations;
    this.#offers = offers;
    this.#placeRenderList = placeRenderList;
  }

  init(point,destinations,offers) {
    this.#point = point;
    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    console.log('this.#point');
    console.log(this.#point);

    this.#renderPoint(this.#point,this.#destinations,this.#offers)

    const pointDestination = destinations.find((item) => item.id === point.destination);
    const destinationName = `${point.type} ${destination.name}`;
    const offerListByTypePoint = offers.find((item) => item.type === point.type);
    const currentOfferList = offerListByTypePoint.offers.filter((offer) => point.offers.find((item) => offer.id === item));

    this.#pointComponent = new PointView({point:point,
      destinationName: destinationName,
      currentOfferList: currentOfferList,
      onClickButtonArrow: () => {
        replacePointToEditPoint();
        document.addEventListener('keydown',escKeyDownHandler)
      }
    })

    const editDestinationPoint = this.#destinations.find((item) => item.id === point.destination);
    const editOffersByType = this.#offers.find((item) => item.type === currentPoint.type);

    this.#editPointComponent = new EditPointView({point:point,
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

    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this.#pointComponent, this.#placeRenderList);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editPointComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);

  }

  #renderPoint (currentPoint, boardDestinations, boardOffers) {


    const escKeyDownHandler = (evt) => {
      if ((evt.key === 'Escape') || (evt.key === 'esc')) {
        evt.preventDefault();
        replaceEditPointToPoint();
        document.removeEventListener('keydown',escKeyDownHandler);
      }
    }





    function replacePointToEditPoint(){
      replace(editPointComponent, pointComponent);
    }

    function replaceEditPointToPoint(){
      replace(pointComponent, editPointComponent);
    }

    render(this.#pointComponent, this.#placeRenderList.element);

  };


};

