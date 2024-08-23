import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

import {FilterType} from '../consts.js';

function isPointInPast(endDate) {
  return endDate && dayjs().isAfter(endDate, 'D');
}

function isPointInPresent(startDate, endDate) {
  return dayjs().isSameOrAfter(startDate, 'D') && dayjs().isSameOrBefore(endDate, 'D');
}

function isPointInFuture(startDate) {
  return startDate && dayjs().isBefore(startDate, 'D');
}

const FiltersMap = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointInFuture(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPointInPresent(point.dateFrom, point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointInPast(point.dateTo)),
};

function generateFilter() {
  return Object.entries(Filters).map(([filterType]) => ({type: filterType}));
}

export {FiltersMap, generateFilter};
