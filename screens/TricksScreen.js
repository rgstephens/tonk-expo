/**
 * @providesModule TricksScreen
 * @flow
 */

import React from 'react';
import { ListView, ScrollView, Text, View } from 'react-native';

import { connect } from 'react-redux';

import TrickListView from 'TrickListView';

@connect(data => TricksScreen.getDataProps)
export default class TricksScreen extends React.Component {
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
