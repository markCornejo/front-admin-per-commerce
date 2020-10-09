import { ActionReducerMap } from '@ngrx/store';
import * as ui from './services/redux/ui.reducer';
import * as login from './login/login.reducer';
import * as structure from './structure/structure.reducer';

export interface AppState {
  ui: ui.State;
  user: login.State;
  base: structure.State;
  site: structure.SiteState;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  user: login.loginReducer,
  base: structure.baseReducer,
  site: structure.siteReducer,
}
