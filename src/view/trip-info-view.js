import AbstractView from '../framework/view/abstract-view';

function createRouteTravel(pathPointMap) {
  let stringRoute = pathPointMap[0];
  for (let i = 1; i<pathPointMap.length; i++) {
    stringRoute = stringRoute + ' &mdash; ' + pathPointMap[i];
  }
  return stringRoute;
}

function createPeriodTravel(beginDate,endDate) {
  return (`${beginDate}&nbsp;&mdash;&nbsp;${endDate}`);
}


function createTripInfoTemplate(pathPointMap,beginDate,endDate,costValue) {
  return (`
  <section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${createRouteTravel(pathPointMap)}</h1>

      <p class="trip-info__dates">${createPeriodTravel(beginDate,endDate)}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${costValue}</span>
    </p>
  </section>
`);
}

export default class TripInfoView extends AbstractView{
  #beginDate = null;
  #endDate = null;
  #routeTravel = null;
  #costValue = null;

  constructor ({routeTravel,beginDate,endDate,costValue}) {
    super();
    this.#routeTravel = routeTravel;
    this.#beginDate = beginDate;
    this.#endDate = endDate;
    this.#costValue = costValue;
  }

  get template() {
    console.log('create template');
    console.log(this.#routeTravel);
    console.log('end create template');
    return createTripInfoTemplate(this.#routeTravel,this.#beginDate,this.#endDate,this.#costValue);
  }

}
