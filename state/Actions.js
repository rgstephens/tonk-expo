/**
* @providesModule Actions
* @flow
*/

import ActionTypes from 'ActionTypes';

type RawUserData =
| {
  id: number,
  authToken: string,
  email: string,
  username: string,
}
| {
  isGuest: true,
}
| null;

export default class Actions {
  static setCurrentUser(user: RawUserData) {
    return {
      type: ActionTypes.SET_CURRENT_USER,
      user,
    };
  }

  static becomeGuest() {
    return {
      type: ActionTypes.BECOME_GUEST,
    };
  }

  static signIn(user: RawUserData) {
    return {
      type: ActionTypes.SIGN_IN,
      user,
    };
  }

  static signOut() {
    return {
      type: ActionTypes.SIGN_OUT,
    };
  }

  static openApp(app) {
    return {
      type: ActionTypes.OPEN_APP,
      app,
    };
  }

  static addAppToHistory(app) {
    return {
      type: ActionTypes.ADD_APP_TO_HISTORY,
      app,
    };
  }

  static setHistory(history) {
    return {
      type: ActionTypes.SET_HISTORY,
      history,
    };
  }

  static addPlayer(player) {
    return {
      type: ActionTypes.ADD_PLAYER,
      player,
    };
  }

  static setName(id, name) {
    console.log('setName: ' + id + '/' + name);
    return {
      type: ActionTypes.SET_NAME,
      id,
      name,
    };
  }

  static removePlayer(player) {
    return {
      type: ActionTypes.REMOVE_PLAYER,
      player,
    };
  }

  static toggleActive(id) {
    return {
      type: ActionTypes.TOGGLE_ACTIVE,
      id,
    };
  }

  static bumpRowchange() {
    return {
      type: ActionTypes.BUMP_ROWCHANGE,
    };
  }

  static betIncrease() {
    console.log('betIncrease');
    return {
      type: ActionTypes.BET_INCREASE,
    };
  }

  static betDecrease() {
    console.log('betDecrease');
    return {
      type: ActionTypes.BET_DECREASE,
    };
  }

  static setBet(amount) {
    console.log('setBet');
    return {
      type: ActionTypes.SET_BET,
      amount,
    };
  }

  static resetScores() {
    return {
      type: ActionTypes.RESET_SCORES,
    };
  }

  static resetGame() {
    return {
      type: ActionTypes.RESET_GAME,
    };
  }

  static won(id, multiplier) {
    return {
      type: ActionTypes.WON,
      id,
      multiplier,
    };
  }

  static undercut(winnerId, loserId) {
    return {
      type: ActionTypes.UNDERCUT,
      winnerId,
      loserId,
    };
  }

  static showGlobalLoading() {
    return {
      type: ActionTypes.SHOW_GLOBAL_LOADING,
    };
  }

  static hideGlobalLoading() {
    return {
      type: ActionTypes.HIDE_GLOBAL_LOADING,
    };
  }
}
