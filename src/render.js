const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

function createElement(template) {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  console.log(newElement.children);

  return newElement.firstElementChild;
}

function createFragment(template) {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  console.log(newElement.children);

  return newElement.children;
}


function render(component, container, place = RenderPosition.BEFOREEND) {
  container.insertAdjacentElement(place, component.getElement());
}

export {RenderPosition, createElement, render, createFragment};
