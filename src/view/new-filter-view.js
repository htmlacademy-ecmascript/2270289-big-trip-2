
import {createElement, createFragment} from '../render.js';

const filtersMap = [
  `<div class="trip-filters__filter">
    <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">
    <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
  </div>`,
  `<div class="trip-filters__filter">
     <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
     <label class="trip-filters__filter-label" for="filter-future">Future</label>
  </div>`,
  `<div class="trip-filters__filter">
    <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">
    <label class="trip-filters__filter-label" for="filter-present">Present</label>
  </div>`,
  `<div class="trip-filters__filter">
    <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" checked>
    <label class="trip-filters__filter-label" for="filter-past">Past</label>
  </div>`
];

function createFilterTemplate() {
  return filtersMap;
}

const createAnyFragment = (elements) => {
  const fragment = document.createDocumentFragment;
  elements.forEach((element) => {
    fragment.appendChild(element);
  });
  return fragment;
};

function renderAny(component, container) {
  const elementCollection = createFragment();
  console.log('я здесь');
  for (let i = 0; i < elementCollection.length; i++) {
    render(elementCollection[i], container);
  }
}


class NewFilterView {
  getTemplate() {
    return createFilterTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  getFragment() {
    if (!this.element) {
      this.element = createFragment(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}


export {NewFilterView};
