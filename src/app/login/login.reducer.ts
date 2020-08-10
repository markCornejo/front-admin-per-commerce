import { createReducer, on } from '@ngrx/store';
import { setUser, unSetUser } from './login.actions';
import { User } from '../model/user.model';

export interface State {
    user: User;
}

export const initialState: State = {
   user: null,
}

// tslint:disable-next-line: variable-name
const _loginReducer = createReducer(initialState,

    on(setUser, (state, {user}) => ({ ...state, user: { ...user } })),
    on(unSetUser, state => ({ ...state, user: null }))

);

export function loginReducer(state, action) {
    return _loginReducer(state, action);
}
