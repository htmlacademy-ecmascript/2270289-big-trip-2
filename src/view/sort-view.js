import AbstractView from '../framework/view/abstract-view';
import {sortMap} from '../consts.js';

function createSortItemTemplate(sortType, currentSortType) {

  const disable = (sortType === 'event' || sortType === 'offers') ? 'disabled' : '';
  const checked = (sortType === currentSortType) ? 'checked' : '';

  return (`
  <div class="trip-sort__item  trip-sort__item--${sortType}">
      <input id="sort-${sortType}" class="trip-sort__input  visually-hidden"
        type="radio" name="trip-sort" value="sort-${sortType}" ${disable} data-sort-type="${sortType}" ${checked}>
      <label class="trip-sort__btn" for="sort-${sortType}">${sortType}</label>
    </div>
  `);
};

function createSortTemplate(currentSortType) {
  return (`
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${sortMap.map((item) => createSortItemTemplate(item,currentSortType)).join('')}
  </form>
`);
}

export default class SortView extends AbstractView{
  #handleSortType = null;
  #currentSortType = null;

  constructor ({currentSortType, onSortByType}) {
    super();
    this.#handleSortType = onSortByType;
    this.#currentSortType = currentSortType;
    //this.element.querySelectorAll('.trip-sort__input').forEach((input) => { input.addEventListener('click', this.#sortTypeClick);});
    this.element.addEventListener('click', this.#sortTypeClick);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortTypeClick = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    evt.preventDefault();
    this.#handleSortType(evt.target.dataset.sortType);
    //console.log(evt.target.id);
    //console.log(evt.target.checked);
  };

}
