import { createAction, props } from '@ngrx/store';
import { User } from '../model/user.model';

export const setUser = createAction(
      '[User Login Component] setUSer',
      props<{user: User}>()
    );

export const unSetUser = createAction('[User Login Component] unSetUSer');
