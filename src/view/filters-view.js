import AbstractView from '../framework/view/abstract-view';
import {filterMap} from '../consts.js';

function createFilterItemTemplate (filterType, currentFilterType) {
  return (`
  <div class="trip-filters__filter">
    <input id="filter-${filterType}" class="trip-filters__filter-input
      visually-hidden" type="radio" name="trip-filter"
      value="${filterType}"
      ${filterType === currentFilterType ? 'checked' : ''}>
    <label class="trip-filters__filter-label"
      for="filter-${filterType}">${filterType}
    </label>
  </div>
`);
}

function createFilterTemplate(filterMap, currentFilterType) {
  return (`
  <form class="trip-filters" action="#" method="get">
    ${filterMap.map((item) => createFilterItemTemplate(item,currentFilterType)).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
  `);
}

export default class FilterView extends AbstractView {

  #filters;
  #handleFilterTypeChange;
  #currentFilter;

  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#handleFilterTypeChange = onFilterTypeChange;
    this.#currentFilter = currentFilterType;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };

}
