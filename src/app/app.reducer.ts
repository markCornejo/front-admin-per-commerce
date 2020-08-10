import { ActionReducerMap } from '@ngrx/store';
import * as ui from './services/redux/ui.reducer';
import * as login from './login/login.reducer';

export interface AppState {
  ui: ui.State;
  user: login.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  user: login.loginReducer
}
