//import {createElement} from '../render.js';
import AbstractView from '../framework/view/abstract-view';

function createListEventsTemplate() {
  return (`<ul class="trip-events__list"></ul>
`);
}

export default class EventsView extends AbstractView {
  get template() {
    return createListEventsTemplate();
  }
  /*
  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
  */
}
