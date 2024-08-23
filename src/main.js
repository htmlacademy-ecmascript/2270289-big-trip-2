import BoardPresenter from './presenter/board-presenter.js';
import RouteModel from './model/route-model.js';
import FilterModel from './model/filter-model.js';

const siteBody = document.querySelector('.page-body');
const buttonAddPoint = document.querySelector('.trip-main__event-add-btn');

const routeModel = new RouteModel();
const filterModel = new FilterModel();

buttonAddPoint.addEventListener('click', handleButtonAddPointClick);

const boardPresenter = new BoardPresenter({
  boardContainer: siteBody,
  routeModel,
  filterModel,
  onAddPointDestroy: handleButtonAddPointClose,

});

function handleButtonAddPointClose() {
  buttonAddPoint.disabled = false;
}

function handleButtonAddPointClick() {
  boardPresenter.createPoint();
  buttonAddPoint.disabled = true;
}

boardPresenter.init();

