import BoardPresenter from './presenter/board-presenter.js';
import RouteModel from './model/route-model.js';

const siteBody = document.querySelector('.page-body');

const routeModel = new RouteModel();
const boardPresenter = new BoardPresenter({
  boardContainer: siteBody,
  routeModel,
});

boardPresenter.init();

