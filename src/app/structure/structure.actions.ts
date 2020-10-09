import { createAction, props } from '@ngrx/store';

export const getUbigeoRx = createAction(
  '[general location] getUbigeoRx',
  props<{location: any}>()
);

export const getSite = createAction(
  '[obtener Site] setSite',
  props<{site: any}>()
)
