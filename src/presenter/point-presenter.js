
import EmptyPointView from '../view/empty-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';

export default class PoinPresenter {
  #points = null;
  #destinations = null;
  #offers = null;
  #placeRender = null;

  constructor ({points,destinations,offers,placeRender}) {
    this.#points = points;
    this.#destinations =destinations;
    this.#offers = offers;
    this.#placeRender = placeRender;

  }

  init() {
    if (this.#points.length === 0) {
      render(new EmptyPointView(), this.#placeRender);
    } else {
      for (let i = 0; i < this.#points.length; i++) {
        this.#renderPoint(this.#points[i],this.#destinations,this.#offers)
      }
    };
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

    const pointComponent = new PointView({point:currentPoint,
      destinationName: destinationName,
      currentOfferList: currentOfferList,
      onClickButtonArrow: () => {
        replacePointToEditPoint();
        document.addEventListener('keydown',escKeyDownHandler)
      }
    })

    const editDestinationPoint = this.#destinations.find((item) => item.id === currentPoint.destination);
    const editOffersByType = this.#offers.find((item) => item.type === currentPoint.type);

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


};

