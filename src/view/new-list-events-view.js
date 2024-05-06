import {createElement} from '../render.js';

function createListEventsTemplate() {
  return (`<ul class="trip-events__list"></ul>
`);
}

export default class NewListEvents {
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
