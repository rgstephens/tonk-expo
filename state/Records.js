/**
 * @providesModule Records
 * @flow
 */

import { Record } from 'immutable';

export const User = Record({
  id: null,
  authToken: '',
  avatarUrl: '',
  email: '',
  username: '',
  isGuest: false,
});

export const Player = Record({
  id: null,
  name: '',
  balance: 0,
  active: true  // this is probably a state value, not persisted, also undercutLoser & undercutWinner
});

export const Trick = Record({
  id: null,
  timestamp: null,
});

export const ApiState = Record({
  isLoading: false,
});
