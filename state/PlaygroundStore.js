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
import undoable from 'redux-undo';

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
    game: undoable(GameReducer, { limit: 100, filter: function filterActions(action, currentState, previousHistory) {
      if (action.type == "WON" || action.type == "UNDERCUT") {
        //console.log('>True');
        let { past, present, future } = previousHistory;
        console.log('PlaygroundStore/undoable, action: ' + JSON.stringify(action.type) + ', present: ' + JSON.stringify(present));
        //console.log('PlaygroundStore/undoable, future: ' + JSON.stringify(future));
        console.log('PlaygroundStore/undoable, past.length >>> ' + past.length + ' <<<');
        //console.log('PlaygroundStore/undoable, past: ' + JSON.stringify(past));
        return true;
      }
    } }),
    apiState: ApiStateReducer,
  }),
  applyMiddleware(effectsMiddleware(Effects))
);
