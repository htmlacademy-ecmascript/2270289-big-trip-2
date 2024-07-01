import AbstractView from '../framework/view/abstract-view';
import {filterMap} from '../consts.js';

function createFilterItemTemplate (filterType) {
  //
  return (`
  <div class="trip-filters__filter">
    <input id="filter-${filterType}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterType}">
    <label class="trip-filters__filter-label" for="filter-${filterType}">${filterType}</label>
  </div>
`);

}

function createFilterTemplate() {
  return (`
  <form class="trip-filters" action="#" method="get">
    ${filterMap.map((item) => createFilterItemTemplate(item)).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
  `);
}

export default class FilterView extends AbstractView {
  get template() {
    return createFilterTemplate();
  }

}
