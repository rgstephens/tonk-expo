/**
 * @providesModule TrickRow
 * @flow
 */

import { connect } from 'react-redux';
import { withNavigation } from '@expo/ex-navigation';
import React, { PropTypes } from 'react';
import { View, Text, TextInput, ListView, Image, Button, KeyboardAvoidingView, StyleSheet, TouchableHighlight, PixelRatio } from 'react-native';
import { getTheme, setTheme, MKButton, MKColor } from 'react-native-material-kit';
import Actions from 'Actions';

import Colors from 'Colors';
import Layout from 'Layout';
import Metrics from 'Metrics';

var styles = StyleSheet.create({
  TrickRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 30,
    //marginBottom: 20
    //paddingVertical: 10
  },
  trickTitle: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'black',
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  balanceButton: {
    alignSelf: 'flex-end',
    width: 70,
    height: 30,
    paddingVertical: 5,
    marginBottom: 10,
    marginRight: 10,
    paddingRight: 10,
    borderRadius: 3,
    shadowRadius: 2,
    shadowOpacity: .7,
    shadowColor: 'black',
    elevation: 2,
    borderColor: 'transparent'
  },
  colorPlus: {
    backgroundColor: Colors.mediumAquamarine,
  },
  colorMinus: {
    backgroundColor: Colors.fire,
  },

  winLoss: {
    alignSelf: 'center',
  },

  balanceText: {
    alignSelf: 'flex-end'
  },
  cardTitleBackgroundColor1: {
    backgroundColor: Colors.background1a,
  },
  cardTitleBackgroundColor2: {
    backgroundColor: Colors.background1b,
  },
  cardTitleBackgroundColor3: {
    backgroundColor: Colors.background1c,
  },
  cardTitleBackgroundColor4: {
    backgroundColor: Colors.background1d,
  },
  cardTitleBackgroundColor5: {
    backgroundColor: Colors.background1e,
  },
});

@connect()
@withNavigation
export default class TrickRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    //console.log('TrickRow/constructor this.state.players: ' + JSON.stringify(this.state.players));
    console.log('TrickRow/constructor this.state.playerNames: ' + JSON.stringify(this.state.playerNames));
    //debugger;
  }

  componentWillReceiveProps(nextProps: Props) {
    console.log('TrickRow/componentWillReceiveProps nextProps: ' + JSON.stringify(nextProps));
    if (nextProps !== this.props) {
      this.setState({ ...nextProps });
    }
  }

  render() {
    //console.log('TrickRow/render, this.state.players: ' + JSON.stringify(this.state.players));
    //console.log('TrickRow/render, id: ' + this.state.id + ', trickCount: ' + this.state.trickCount);
    //console.log('TrickRow/render, this.state.present: ' + JSON.stringify(this.state.present));
    const oddRow = this.state.id % 2;
    console.log('TrickRow/render, oddRow: ' + oddRow + ', id: ' + this.state.id + ', trickCount: ' + this.state.trickCount);
    if (this.state.id === "0") {
      // title
      //debugger;
      return (
        <View
          style={[styles.TrickRow, oddRow == 0 ? styles.cardTitleBackgroundColor1 : styles.cardTitleBackgroundColor2 ]}>
          {this.state.playerNames.map(function (name, index) {
            return <Text key={index} style={styles.trickTitle}>{name}</Text>
          })}
        </View>
      );
    } else {
/*
      if (this.state.id == (this.state.trickCount - 1)) {
        return (
          <View>
          <View
            style={[styles.TrickRow, oddRow == 0 ? styles.cardTitleBackgroundColor1 : styles.cardTitleBackgroundColor2 ]}>
            {this.state.players.map(function (player, index) {
              return <Text key={player.id}>{player.balance < 0 ? player.balance.toFixed(2) : '+' + player.balance.toFixed(2)}</Text>
            })}
          </View>
          <View
            style={[styles.TrickRow, oddRow == 0 ? styles.cardTitleBackgroundColor2 : styles.cardTitleBackgroundColor1 ]}>
            {this.state.present.players.map(function (player, index) {
              return <Text key={player.id}>{player.balance < 0 ? player.balance.toFixed(2) : '+' + player.balance.toFixed(2)}.</Text>
            })}
          </View>
          </View>
        );
      } else {
        return (
          <View
            style={[styles.TrickRow, oddRow == 0 ? styles.cardTitleBackgroundColor1 : styles.cardTitleBackgroundColor2 ]}>
            {this.state.players.map(function (player, index) {
              return <Text key={player.id}>{player.balance < 0 ? player.balance.toFixed(2) : '+' + player.balance.toFixed(2)}</Text>
            })}
          </View>
        );
      }
*/
      return (
        <View
          style={[styles.TrickRow, oddRow == 0 ? styles.cardTitleBackgroundColor1 : styles.cardTitleBackgroundColor2 ]}>
          {this.state.players.map(function (player, index) {
            return <Text key={player.id}>{player.balance < 0 ? player.balance.toFixed(2) : '+' + player.balance.toFixed(2)}</Text>
          })}
        </View>
      );
    }
  }
}
