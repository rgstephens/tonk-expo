/**
 * @providesModule GameReducer
 */

import ActionTypes from 'ActionTypes';

const initialState = {
  players: [
    {id: 0, name: '', balance: 0, active: true, won: 0, lost: 0, rowchange: 0},
    {id: 1, name: '', balance: 0, active: true, won: 0, lost: 0, rowchange: 0},
    {id: 2, name: '', balance: 0, active: true, won: 0, lost: 0, rowchange: 0},
  ],
  stakes: 1
}

class GameReducer {
  static reduce(state = initialState, action) {
    if (GameReducer[action.type]) {
      return GameReducer[action.type](state, action);
    } else {
      console.log('GameReducer state: ' + JSON.stringify(state));
      return state;
    }
  }

  static [ActionTypes.ADD_PLAYER](state, action) {
    // action.id, action.name
    console.log('ADD_PLAYER');
    //console.log('state: ' + JSON.stringify(state));
    const players = [ ...state.players.slice(), {id: state.players.length, name: '', balance: 0, active: true, won: 0, lost: 0, rowchange: 0}];
    return {...state, players};
  }

  static [ActionTypes.SET_NAME](state, action) {
    // action.id, action.name
    console.log('SET_NAME, action: ' + JSON.stringify(action, ["id","name"]));
    //console.log('state: ' + JSON.stringify(state));
    let players = state.players.map( (item, index) => {
      console.log('map item: ' + JSON.stringify(item) + ', index: ' + index);
      if(index == action.id) {
        return {
          ...item,
          name: action.name
        };
      }
      return {
        ...item,
      };
    });
    return {...state, players};
  }

  static [ActionTypes.ADD_APP_TO_PLAYER](state, action) {
    return [...state, action.app];
  }

  static [ActionTypes.TOGGLE_ACTIVE](state, action) {
    // action.id
    console.log('TOGGLE_ACTIVE, action: ' + JSON.stringify(action));
    console.log('state: ' + JSON.stringify(state));
    let players = state.players.map( (item, index) => {
      console.log('map item: ' + JSON.stringify(item) + ', index: ' + index);
      if(index != action.id) {
        console.log('no match');
        // This isn't the item we care about - keep it as-is
        return item;
      }

      console.log('match');
      // Otherwise, this is the one we want - return an updated value
      return {
        ...item,
        active: !item.active
      };
    });
    return {...state, players};
    //return [...state, action.id];
  }

  static [ActionTypes.WON](state, action) {
    // action.id, action.multiplier
    console.log('WON, action: ' + JSON.stringify(action));
    //console.log('WON, state: ' + JSON.stringify(state));
    const numActive = state.players.filter((player) => player.active).length;
    let players = state.players.map((item, index) => {
      //console.log('map item: ' + JSON.stringify(item) + ', index: ' + index);
      if (index != action.id) {
        // loser
        if (item.active) {
          return {
            ...item,
            balance: item.balance - (state.stakes * action.multiplier),
            lost: item.lost + 1
          };
        } else {
          return {
            ...item
          };
        }
      }
      // winner
      return {
        ...item,
        balance: item.balance + ((state.stakes * action.multiplier) * (numActive - 1)),
        rowchange: item.rowchange + 1,
        won: item.won + 1
      };
    });
    //console.log('returning players: ' + JSON.stringify(players));
    return {...state, players};
  }

  static [ActionTypes.BUMP_ROWCHANGE](state, action) {
    console.log('BUMP_ROWCHANGE');
    let players = state.players.map((item, index) => {
      return {
        ...item,
        rowchange: item.rowchange + 1
      };
    });
    return {...state, players};
  }

  static [ActionTypes.BET_INCREASE](state, action) {
    console.log('BET_INCREASE');
    return {...state, stakes: state.stakes + 1};
  }

  static [ActionTypes.BET_DECREASE](state, action) {
    console.log('BET_DECREASE');
    return {...state, stakes: state.stakes - 1};
  }

  static [ActionTypes.SET_BET](state, action) {
    // action.amount
    console.log('BET_DECREASE, action: ' + JSON.stringify(action));
    return {...state, stakes: parseInt(action.amount)};
  }

  static [ActionTypes.RESET_SCORES](state, action) {
    console.log('RESET_SCORES');
    let players = state.players.map((item, index) => {
      return {
        ...item,
        balance: 0,
        won: 0,
        lost: 0
      };
    });
    return {...state, players};
  }

  static [ActionTypes.RESET_GAME](state, action) {
    console.log('RESET_GAME');
    return initialState;
  }

  static [ActionTypes.UNDERCUT](state, action) {
    // action.winnerId, action.loserId - if both are null, then toggle undercutScoring
    console.log('UNDERCUT, action: ' + JSON.stringify(action));
    console.log('state: ' + JSON.stringify(state));
    const numActive = state.players.filter((player) => player.active).length;
    const winLossAmount = (state.stakes * (numActive - 1) * 2);
/*
    let players = Object.assign({}, state.players);
    players[action.winnerId].balance = players[action.winnerId].balance + winLossAmount;
    players[action.loserId].balance = players[action.loserId].balance - winLossAmount;
*/
    let players = state.players.map((item, index) => {
      if (index == action.loserId) {
        return {
          ...item,
          balance: item.balance - winLossAmount,
          lost: item.lost + 1
        };
      } else if (index == action.winnerId) {
        return {
          ...item,
          balance: item.balance + winLossAmount,
          won: item.won + 1
        };
      } else {
        return {
          ...item
        };
      }
    });

    console.log('>> state after update: ' + JSON.stringify(state));
    console.log('>> updated Players: ' + JSON.stringify(players));

    return {
      ...state,
      players
    };
  }

  static [ActionTypes.RESET](state, action) {
    return [];
  }
}

console.log('state/GameReducer.js');

export default GameReducer.reduce;
