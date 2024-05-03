import BoardPresenter from './presenter/board-presenter.js';

const siteBody = document.querySelector('.page-body');

const boardPresenter = new BoardPresenter({boardContainer: siteBody});

boardPresenter.init();

