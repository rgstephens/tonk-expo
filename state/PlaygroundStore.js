/**
 * @providesModule PlaygroundStore
 * @flow
 */

import { applyMiddleware, combineReducers, createStore } from 'redux';
import { effectsMiddleware } from 'redux-effex';
import {
  NavigationReducer,
  createNavigationEnabledStore,
} from '@expo/ex-navigation';

import ApiStateReducer from 'ApiStateReducer';
import CurrentUserReducer from 'CurrentUserReducer';
import HistoryReducer from 'HistoryReducer';
import GameReducer from 'GameReducer';
import Effects from 'Effects';

export default createStore(
  //console.log('state/PlaygroundStore.js/createStore');
  combineReducers({
    currentUser: CurrentUserReducer,
    history: HistoryReducer,
    game: GameReducer,
    apiState: ApiStateReducer,
  }),
  applyMiddleware(effectsMiddleware(Effects))
);
