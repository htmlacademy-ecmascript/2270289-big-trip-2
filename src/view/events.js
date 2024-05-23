import {createElement} from '../render.js';

function createListEventsTemplate() {
  return (`<ul class="trip-events__list"></ul>
`);
}

export default class Events {
  getTemplate() {
    return createListEventsTemplate();
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
