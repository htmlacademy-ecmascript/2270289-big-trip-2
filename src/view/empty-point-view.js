import AbstractView from '../framework/view/abstract-view.js';
import {ListTextForEmptyPoint} from '../consts.js';

function createEmptyPointTemplate(filterType) {
  return(
    `<p class="trip-events__msg">
       ${ListTextForEmptyPoint[filterType]}
     </p>`
  );
}

export default class EmptyPointView extends AbstractView{
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyPointTemplate(this.#filterType);
  }
}
