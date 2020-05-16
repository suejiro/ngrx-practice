import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { routerReducer } from '@ngrx/router-store';

export interface AppState {}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
};

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    if (!action.type.startsWith('@')) {
      console.groupCollapsed(
        `%c★${action.type}★`,
        'color: green; font-weight: bold; background-color: #ffeb3b82;'
      );
    } else {
      console.groupCollapsed(
        `%c★${action.type}★`,
        'color: grey; font-weight: lighter;'
      );
    }
    console.log('%caction:', 'color: blue; font-weight: bold;', action);
    console.log('%cbefore state:', 'color: red; font-weight: bold;', state);
    console.groupEnd();

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger]
  : [];
