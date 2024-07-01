import AbstractView from '../framework/view/abstract-view';
import {SortType,sortMap} from '../consts.js';

function createSortItemTemplate(sortType) {
  //
  let disable = '';

  if (sortType === 'event' || sortType === 'offers') {
    disable = 'disabled';
   } else {
    disable = '';
   };

  return (`
  <div class="trip-sort__item  trip-sort__item--${sortType}">
      <input id="sort-${sortType}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortType}" ${disable}>
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

  get template() {
    return createSortTemplate();
  }

}
