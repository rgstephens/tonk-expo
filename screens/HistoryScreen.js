/**
 * @providesModule HistoryScreen
 * @flow
 */

import React from 'react';
import { ListView, ScrollView, Text, View } from 'react-native';

import { connect } from 'react-redux';

import TrickListView from 'TrickListView';

@connect(data => HistoryScreen.getDataProps)
export default class HistoryScreen extends React.Component {
  static getDataProps(data) {
    return {
      game: data.game,
    };
  }

  static route = {
    navigationBar: {
      title: 'Trick History',
    },
  };

  render() {
    return <TrickListView game={this.props.game}  />;
  }
}
