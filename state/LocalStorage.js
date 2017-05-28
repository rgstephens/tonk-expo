/**
 * @providesModule LocalStorage
 * @flow
 */

import { AsyncStorage } from 'react-native';

const Keys = {
  User: 'PlaygroundUser',
  History: 'PlaygroundHistory',
  Game: 'Game',
  Tricks: 'Tricks',
};

async function getUserAsync() {
  let results = await AsyncStorage.getItem(Keys.User);

  try {
    let user = JSON.parse(results);
    return user;
  } catch (e) {
    return null;
  }
}

async function saveUserAsync(user: Object) {
  return AsyncStorage.setItem(Keys.User, JSON.stringify(user));
}

async function removeUserAsync() {
  return AsyncStorage.removeItem(Keys.User);
}

async function getHistoryAsync() {
  let results = await AsyncStorage.getItem(Keys.History);

  try {
    let history = JSON.parse(results);
    return history;
  } catch (e) {
    return null;
  }
}

async function saveHistoryAsync(history: Array<any>) {
  return AsyncStorage.setItem(Keys.History, JSON.stringify(history));
}

async function clearHistoryAsync() {
  return AsyncStorage.removeItem(Keys.History);
}

async function getGameAsync() {
  let results = await AsyncStorage.getItem(Keys.Game);
  //debugger;
  //console.log('LocalStorage/getGameAsync: ' + results);

  try {
    let game = JSON.parse(results);
    return game;
  } catch (e) {
    return null;
  }
}

async function saveGameAsync(game: Object) {
  console.log('LocalStorage/saveGameAsync: ' + JSON.stringify(game));
  return AsyncStorage.setItem(Keys.Game, JSON.stringify(game));
}

async function clearGameAsync() {
  return AsyncStorage.removeItem(Keys.Game);
}

async function clearAll() {
  return AsyncStorage.clear();
}

export default {
  saveUserAsync,
  getUserAsync,
  removeUserAsync,
  getHistoryAsync,
  saveHistoryAsync,
  clearHistoryAsync,
  getGameAsync,
  saveGameAsync,
  clearGameAsync,
  clearAll,
};
