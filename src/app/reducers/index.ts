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
    console.log('%cprev state:', 'color: violet; font-weight: bold;', state);
    const nextState = reducer(state, action);
    console.log(
      '%cnext state:',
      'color: darkorange; font-weight: bold;',
      nextState
    );
    console.groupEnd();

    return nextState;
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger]
  : [];
