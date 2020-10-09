import { createReducer, on } from '@ngrx/store';
import { getUbigeoRx, getSite } from './structure.actions';

/*************************************************************************************************** */
/* DATA BASE, example: ubigeo, language, etc */
/*************************************************************************************************** */

export interface State {
  location: any;
  other: any;
}

export const initialState: State = {
  location: null,
  other: null,
};

// tslint:disable-next-line: variable-name
const _baseReducer = createReducer(initialState,

    on(getUbigeoRx, (state, {location}) => ({ ...state, location: {...location} })),

);

export function baseReducer(state, action) {
    return _baseReducer(state, action);
}


/*************************************************************************************************** */
/* DATA del SITE */
/*************************************************************************************************** */

export interface SiteState {
  site: any;
}

export const initialSite: SiteState = {
  site: null
};

// tslint:disable-next-line: variable-name
const _siteReducer = createReducer(initialSite,

  on(getSite, (state, {site}) => ({ ...state, site: {...site} })),

);

export function siteReducer(state, action) {
  return _siteReducer(state, action);
}
