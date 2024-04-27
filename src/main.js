import {NewFilterView} from './view/new-filter-view.js';
import {render, renderAny} from './render.js';

const siteBody = document.querySelector('.page-body');
const siteControlFilters = siteBody.querySelector('.trip-controls__filters');

render(new NewFilterView(), siteControlFilters);
renderAny(new NewFilterView(), siteControlFilters);
