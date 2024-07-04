import {render,replace} from '../framework/render.js';

import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';

export default class PointPresenter {
  //#points = null;
  #destinations = null;
  #offers = null;
  #placeRenderList =null;
  //#placeRenderEmpty = null;

  #point = null;
  #pointComponent = null;
  #editPointComponent = null;

  constructor ({point,destinations,offers,placeRenderList}) {
    this.#point = point;
    this.#destinations =destinations;
    this.#offers = offers;
    this.#placeRenderList = placeRenderList;
  }

  init(point) {
    this.#point = point;
    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    console.log('this.#point');
    console.log(this.#point);

    this.#renderPoint(this.#point,this.#destinations,this.#offers)

  }

  #renderPoint (currentPoint, boardDestinations, boardOffers) {

    const pointDestination = boardDestinations.find((item) => item.id === currentPoint.destination);
    const destinationName = `${currentPoint.type} ${pointDestination.name}`;
    const offerListByTypePoint = boardOffers.find((item) => item.type === currentPoint.type);
    const currentOfferList = offerListByTypePoint.offers.filter((offer) => currentPoint.offers.find((item) => offer.id === item));

    const escKeyDownHandler = (evt) => {
      if ((evt.key === 'Escape') || (evt.key === 'esc')) {
        evt.preventDefault();
        replaceEditPointToPoint();
        document.removeEventListener('keydown',escKeyDownHandler);
      }
    }

    this.#pointComponent = new PointView({point:currentPoint,
      destinationName: destinationName,
      currentOfferList: currentOfferList,
      onClickButtonArrow: () => {
        replacePointToEditPoint();
        document.addEventListener('keydown',escKeyDownHandler)
      }
    })

    const editDestinationPoint = this.#destinations.find((item) => item.id === currentPoint.destination);
    const editOffersByType = this.#offers.find((item) => item.type === currentPoint.type);

    this.#editPointComponent = new EditPointView({point:currentPoint,
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

    render(this.#pointComponent, this.#placeRenderList.element);

  };


};

