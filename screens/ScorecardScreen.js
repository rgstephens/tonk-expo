/**
 * @providesModule ScorecardScreen
 * @flow
 */

import React from 'react';
import { ListView, ScrollView, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Actions from 'Actions';
import Colors from 'Colors';
import { BoldText, RegularText } from 'StyledText';
import Router from 'Router';

import ScorecardListView from '../components/ScorecardListView';

@connect(data => ScorecardScreen.getDataProps)
export default class ScorecardScreen extends React.Component {
  static getDataProps(data) {
    //console.log('ScorecardScreen/getDataProps data.game: ' + JSON.stringify(data.game));
    return {
      game: data.game,
    };
  }

  static route = {
    navigationBar: {
      title: 'Scorecard',
    },
    renderRight() {
      return (
        <RegularText>Plus</RegularText>
      );
    },
  };

  render() {
    //console.log('ScorecardScreen/render, this.props.game: ' + JSON.stringify(this.props.game));
    return <ScorecardListView game={this.props.game}  />;
  }
}

class PlusButton extends React.Component {
  render() {
    //console.log('ScorecardScreen/PlusButton');
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 15,
        }}
        onPress={() => this.props.dispatch(Actions.signOut())}>
        <RegularText style={{ color: '#fff' }}>Plus</RegularText>
      </TouchableOpacity>
    );
  }
}
