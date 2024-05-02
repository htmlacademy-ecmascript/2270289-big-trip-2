import NewFilterView from './view/new-filters.js';
import TripEventsView from './view/new-trip-events.js';
import TripEventsListView from './view/new-trip-events-list.js';


import {render} from './render.js';

const siteBody = document.querySelector('.page-body');
const siteControlFilters = siteBody.querySelector('.trip-controls__filters');
const siteControlTripEvents = siteBody.querySelector('.trip-events');

render(new NewFilterView(), siteControlFilters);
render(new TripEventsView(), siteControlTripEvents);
render(new TripEventsListView(), siteControlTripEvents);
