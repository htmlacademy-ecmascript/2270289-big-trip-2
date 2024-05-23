import {createElement} from '../render.js';
import {humanizeDate,humanizeDateAtribute,humanizeDateHourMinute,humanizeMonthDayHourMinute,durationEventPoint} from '../utils.js';

function getIconsFromTypePoint(type) {
  let icon = '';
  switch (type) {
    case 'taxi' : icon = 'taxi.png';
      break;
    case 'bus' : icon = 'bus.png';
      break;
    case 'train' : icon = 'train.png';
      break;
    case 'ship' : icon = 'ship.png';
      break;
    case 'transport' : icon = 'transport.png';
      break;
    case 'flight' : icon = 'flight.png';
      break;
    case 'check-in' : icon = 'check-in.png';
      break;
    case 'sightseeing' : icon = 'sightseeing.png';
      break;
    case 'restaurant' : icon = 'restaurant.png';
      break;
  }
  return icon;
}

function getOfferForPoint({title,price}) {
  return (`
  <li class="event__offer">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </li>
`);
}


function createEventsPointTemplate(point,destinationName,currentOffers) {
  const {basePrice, dateFrom, dateTo, isFavorite, type} = point;

  const favorite = isFavorite ?
    'event__favorite-btn--active' :
    '';

  return (`
  <li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${humanizeDateAtribute(dateFrom)}">${humanizeDate(dateFrom)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${getIconsFromTypePoint(type)}" alt="Event type icon">
      </div>
      <h3 class="event__title">${destinationName}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${humanizeDateHourMinute(dateFrom)}">${humanizeMonthDayHourMinute(dateFrom)}</time>
          &mdash;
          <time class="event__end-time" datetime="${humanizeDateHourMinute(dateTo)}">${humanizeMonthDayHourMinute(dateTo)}</time>
        </p>
        <p class="event__duration">${durationEventPoint(dateFrom,dateTo)}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${currentOffers.map((offer) => getOfferForPoint(offer)).join('')}
      </ul>
      <button class="event__favorite-btn ${favorite}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>
`);
}

export default class EventsPointView {

  constructor ({point,destinationName,currentOfferList}) {
    this.point = point;
    this.destinationName = destinationName;
    this.currentOfferList = currentOfferList;
  }

  getTemplate() {
    return createEventsPointTemplate(this.point,this.destinationName,this.currentOfferList);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
