//import AbstractView from '../framework/view/abstract-view.js';
import {humanizeDayMonthYearSlash} from '../utils/utils.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

import {mockDefaultPoint} from '../mock/points.js';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function getOffersByType (offersAll,offersIdPoint) {
  return offersAll.map((offer) => {
    const checked = (offersIdPoint.find((itemId) => itemId === offer.id)) ? 'checked' : '';
    return `
      <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${checked}>
              <label class="event__offer-label" for="event-offer-luggage-1">
                    <span class="event__offer-title">${offer.title}</span>
                      &plus;&euro;&nbsp;
                    <span class="event__offer-price">${offer.price}</span>
              </label>
      </div>
    `;
  }).join('');
}

function getPhotosByDestination (destination) {
  if (destination.pictures) {
    return `
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${destination.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('')}
        </div>
      </div>
  `;
  } else {
    return '';
  }
}

function createPointTypeItem(types) {
  return types.map((itemType) => {
    return `<div class="event__type-item">
              <input id="event-type-${itemType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${itemType}">
              <label class="event__type-label  event__type-label--${itemType}" for="event-type-${itemType}-1">${itemType}</label>
            </div>`;
  }).join('');
}

function createPointDestinationNameItem(names) {
  return names.map((itemName) => `<option value="${itemName}"></option>`).join('');
}

//namesDestination
function createEditEventTemplate(point,destination,offers,typesOffer,namesDestination) {
  const offersAll = [...offers.offers];
  const offersIdPoint = [...point.offers];
  console.log('namesDestination',namesDestination);
  return (`
<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${createPointTypeItem(typesOffer)}
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
      ${point.type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${createPointDestinationNameItem(namesDestination)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text"
               name="event-start-time" value="${humanizeDayMonthYearSlash(point.dateFrom)}">
          &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text"
               name="event-end-time" value="${humanizeDayMonthYearSlash(point.dateTo)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${point.basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>

    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${getOffersByType (offersAll,offersIdPoint)}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">
          ${destination.description}
        </p>
        ${getPhotosByDestination(destination)}
      </section>
    </section>
  </form>
</li>
  `);
}

//export default class EditPointView extends AbstractView {
export default class EditPointView extends AbstractStatefulView {
  #point;
  #destination;
  #offers;

  #allDestinations;
  #allOffers;

  #handleEditFormButtonSave;
  #handleEditFormButtonArrow;

  constructor ({point,destination,offers,allDestinations,allOffers,onEditFormButtonSave,onEditFormButtonArrow}) {
    super();
    //this.#point = point;

    this._setState(EditPointView.parsePointToState(point));

    this.#destination = destination;
    this.#offers = offers;

    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;

    this.#handleEditFormButtonSave = onEditFormButtonSave;
    this.#handleEditFormButtonArrow = onEditFormButtonArrow;

    this._restoreHandlers();
  }

  _restoreHandlers() {
    // Обработчик на сохранение формы
    this.element.addEventListener('submit', this.#editFormSave);
    // Обработчик на стрелку
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editArrowClick);
    // Обработчик на выбор типа передвижения
    this.element.querySelector('.event__type-btn').addEventListener('click', this.#selectionTypeMovement);
    // Обработчик на выбор места назначения
    this.element.querySelector('.event__input--destination').addEventListener('click', this.#selectionDestination);
  }

  #selectionTypeMovement () {
    //
  }

  #selectionDestination () {
    //
  }

  get template() {
    //return createEditEventTemplate(this.#point,this.#destination,this.#offers);
    const typesOffer = this.#allOffers.map((offer) => offer.type);
    const namesDestination = this.#allDestinations.map((destination) => destination.name);
    //console.log(namesDestination);
    return createEditEventTemplate(this._state,this.#destination,this.#offers,typesOffer,namesDestination);
  }



  #editFormSave = (evt) => {
    evt.preventDefault();
    //this.#handleEditFormButtonSave();
    this.#handleEditFormButtonSave(EditPointView.parseStateToPoint(this._state));
  };

  #editArrowClick = (evt) => {
    evt.preventDefault();
    //this.#handleEditFormButtonArrow();
    this.#handleEditFormButtonSave(EditPointView.parseStateToPoint(this._state));
  };

  static parsePointToState(point) {
    return {...point
      //,
      //isDueDate: point.dueDate !== null,
      //isRepeating: isPointRepeating(point.repeating),
    };
  }

  static parseStateToPoint(state) {
    const point = {...state};
/*
    if (!point.isDueDate) {
      point.dueDate = null;
    }

    if (!point.isRepeating) {
      point.repeating = {
        mo: false,
        tu: false,
        we: false,
        th: false,
        fr: false,
        sa: false,
        su: false,
      };
    }
*/
//    delete point.isDueDate;
//    delete point.isRepeating;

    return point;
  }

}
