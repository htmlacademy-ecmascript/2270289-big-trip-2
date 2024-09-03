import {remove, render, RenderPosition} from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import {UserAction, UpdateType} from '../consts.js';
import {nanoid} from 'nanoid';
import {mockDefaultPoint} from '../mock/points.js';

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

    if (this.#editPointComponent !== null) {
      return;
    }

    this.#editPointComponent = new EditPointView({
      point: mockDefaultPoint,
      allDestinations: this.#dataDestinations,
      allOffers: this.#dataOffers,
      buttonText: 'Cancel',
      isAddPoint: true,
      onEditFormButtonSave: this.#handleFormButtonSave,
      onEditFormButtonArrow: this.#handleFormButtonArrow,
      onEditFormButtonCancel: this.#handleFormButtonCancel,
    });

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

  #handleFormButtonSave = (point) => {
      console.log('Пытаемся сохранить новую точку.');
      console.log('point',point);
    point.id = nanoid();
      console.log('point',point);
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {...point},
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
