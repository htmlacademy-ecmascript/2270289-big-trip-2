import {render, replace, remove} from '../framework/render.js';
import {FilterType, UpdateType} from '../consts.js';
import FilterView from '../view/filters-view.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #routeModel = null;

  #filterComponent = null;

  constructor({filterContainer, filterModel, routeModel}) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#routeModel = routeModel;

    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#routeModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    return Object.values(FilterType).map((type) => type);
  }

  init() {
    const filters = this.filters;
    //console.log('filters',filters);
    //console.log('filterModel',this.#filterModel);

    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
