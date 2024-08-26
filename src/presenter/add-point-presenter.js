import {remove, render, RenderPosition} from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import {UserAction, UpdateType} from '../consts.js';
import {nanoid} from 'nanoid';
import {mockDefaultPoint} from '../mock/points.js'
export default class AddPointPresenter {
  #dataOffers = null;
  #dataDestinations = null;

  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #editPointComponent = null;

  constructor({pointListContainer, onDataChange, onDestroy}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init(dataOffers, dataDestinations) {
    this.#dataOffers = dataOffers;
    this.#dataDestinations = dataDestinations;

    console.log('this.#editPointComponent',this.#editPointComponent)

    if (this.#editPointComponent !== null) {
      return;
    }

    console.log('this.#dataDestinations',this.#dataDestinations);
    console.log('this.#dataOffers',this.#dataOffers);

    const editOffersByType = this.#dataOffers.find((item) => item.type === mockDefaultPoint.type);

    this.#editPointComponent = new EditPointView({
      point: mockDefaultPoint,
      destination: '',
      offers: editOffersByType,
      allDestinations: this.#dataDestinations,
      allOffers: this.#dataOffers,
      onEditFormSubmit: this.#handleFormSubmit,
      onEditFormButtonArrow: this.#handleFormButtonArrow,
      onEditFormButtonCancel: this.#handleFormButtonCancel,
      buttonText: 'Cancel',
      isAddPoint: true,
    });

    //{point,destination,offers,allDestinations,allOffers,onEditFormButtonSave,onEditFormButtonArrow,onEditFormButtonCancel,buttonText}

    render(this.#editPointComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#handleEscKeyDown);
  }

  destroy() {
    if (this.#editPointComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#editPointComponent);
    this.#editPointComponent = null;

    document.removeEventListener('keydown', this.#handleEscKeyDown);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {id: nanoid(), ...point},
    );
    this.destroy();
  };

  #handleFormButtonCancel = () => {
    this.destroy();
  };

  #handleFormButtonArrow = () => {
    //
  }

  #handleEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
