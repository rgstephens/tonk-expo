/**
 * @providesModule ActionTypes
 * @flow
 */

export default defineActionConstants([
  'WON',
  'UNDERCUT',
  'BUMP_ROWCHANGE',
  'ADD_PLAYER',
  'TOGGLE_ACTIVE',
  'SET_NAME',
  'REMOVE_PLAYER',
  'RESET_SCORES',
  'RESET_GAME',
  'BET_INCREASE',
  'BET_DECREASE',
  'SET_BET',

  'ADD_APP_TO_HISTORY',
  'BECOME_GUEST',
  'HIDE_GLOBAL_LOADING',
  'OPEN_APP',
  'SET_CURRENT_USER',
  'SET_HISTORY',
  'SHOW_GLOBAL_LOADING',
  'SIGN_IN',
  'SIGN_OUT',
]);

function defineActionConstants(names) {
  return names.reduce((result, name) => {
    result[name] = name;
    return result;
  }, {});
}
