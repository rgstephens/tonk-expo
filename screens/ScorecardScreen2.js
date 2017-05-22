/**
 * @providesModule ScorecardScreen2
 * @flow
 */

import React from 'react';
import { ListView, ScrollView, Text, View, StyleSheet, Dimensions, Platform } from 'react-native';
import { MKColor, getTheme, setTheme, MKButton } from 'react-native-material-kit';
import Metrics from '../constants/Metrics';
import Colors from '../constants/Colors';
import ApplicationStyles from '../constants/ApplicationStyles';

import { connect } from 'react-redux';

import ScorecardListView from 'ScorecardListView';

@connect(data => ScorecardScreen.getDataProps)
export default class ScorecardScreen extends React.Component {
  static getDataProps(data) {
    console.log('data: ' + JSON.stringify(data));
    return {
      scores: data.history,
    };
  }

  static route = {
    navigationBar: {
      title: 'Scorecard',
    },
  };

  render() {
    console.log('this.props.history: ' + JSON.stringify(this.props.scores));
    return (
      <div>
        <ScorecardListView scores={this.props.scores} />
      </div>
    );
  }
}
