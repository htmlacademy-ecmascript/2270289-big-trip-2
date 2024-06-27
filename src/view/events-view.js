import AbstractView from '../framework/view/abstract-view';

function createListEventsTemplate() {
  return (`<ul class="trip-events__list"></ul>
`);
}

export default class EventsView extends AbstractView {
  get template() {
    return createListEventsTemplate();
  }

}
