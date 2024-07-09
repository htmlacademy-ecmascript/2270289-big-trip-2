import AbstractView from '../framework/view/abstract-view';
import {sortMap} from '../consts.js';

function createSortItemTemplate(sortType) {

  const  disable = (sortType === 'event' || sortType === 'offers') ? 'disabled': '';

  return (`
  <div class="trip-sort__item  trip-sort__item--${sortType}">
      <input id="sort-${sortType}" class="trip-sort__input  visually-hidden"
        type="radio" name="trip-sort" value="sort-${sortType}" ${disable}
        data-sort-type="${sortType}">
      <label class="trip-sort__btn" for="sort-day">${sortType}</label>
    </div>
  `);
};

function createSortTemplate() {
  return (`
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${sortMap.map((item) => createSortItemTemplate(item)).join('')}
  </form>
`);
}

export default class SortView extends AbstractView{
  #handleSortType = null;

  constructor ({onSortByType}) {
    super();
    this.#handleSortType = onSortByType;

    this.element.querySelectorAll('.trip-sort__input').forEach((input) => { input.addEventListener('click', this.#sortTypeClick);
    });

  }

  get template() {
    return createSortTemplate();
  }

  #sortTypeClick = (evt) => {
    this.#handleSortType(evt.target.dataset.sortType);
  };

}
