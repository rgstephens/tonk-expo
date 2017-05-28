/**
 * @providesModule TrickListView
 * @flow
 */

import React from 'react';
import {
  ActionSheetIOS,
  ActivityIndicator,
  AppState,
  Image,
  Linking,
  ListView,
  NativeModules,
  PixelRatio,
  RefreshControl,
  StyleSheet,
  TouchableHighlight,
  View,
  Dimensions,
  Platform,
  TextInput,
  Text,
  Button,
  KeyboardAvoidingView,
} from 'react-native';

import { MKColor, getTheme, setTheme, MKButton } from 'react-native-material-kit';
import ActionButton from 'react-native-action-button';
import { Ionicons, Foundation } from '@expo/vector-icons';

const { ExponentUtil } = NativeModules;

import { connect } from 'react-redux';
import { withNavigation } from '@expo/ex-navigation';
import TrickRow from 'TrickRow';

import Actions from 'Actions';
import AppDataApi from 'AppDataApi';
import Alerts from 'Alerts';
import Colors from 'Colors';
import Layout from 'Layout';
import { RegularText } from 'StyledText';

type State = {
  playerCount: number,
  isLoadingApp: boolean,
  dataSource: ListView.DataSource,
};

@connect()
@withNavigation
export default class TrickListView extends React.Component {
  state: State;

  constructor(props, context) {
    super(props, context);
    //console.log('TrickListView/constructor props.game.past: ' + JSON.stringify(props.game.past));
    console.log('TrickListView/constructor props.game.past.length: ' + props.game.past.length);
    //debugger;

    let dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    if (props.game) {
      dataSource = dataSource.cloneWithRows([...props.game.past, props.game.present]);
    }

    const playerNames = props.game.past.length > 0 ? props.game.past[props.game.past.length-1].players.map(function(p) {return p.name;}) : []
    console.log('TrickListView/constructor playerNames: ' + playerNames);

    this.state = {
      maxPlayers: props.game.past.length > 0 ? props.game.past[props.game.past.length-1].players.length : 0,
      playerNames: playerNames,
      //present: props.game.present,
      //trickCount: props.game.past.length,
      dataSource,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.game.past !== this.props.game.past) {
      const playerNames = nextProps.game.past.length > 0 ? nextProps.game.past[nextProps.game.past.length-1].players.map(function(p) {return p.name;}) : []
      console.log('TrickListView/constructor playerNames: ' + playerNames);
      //debugger;

      this.setState({
        maxPlayers: nextProps.game.past[nextProps.game.past.length-1].players.length,
        playerNames: playerNames,
        //present: nextProps.game.present,
        //trickCount: nextProps.game.past.length,
        dataSource: this.state.dataSource.cloneWithRows([...nextProps.game.past, nextProps.game.present]),
      });
    }
  }

  render() {
    if (this.state.dataSource.getRowCount() > 0) {
      //const playerNames = objArray.map(function(a) {return a.foo;});
      //debugger;
      return (
          <View style={styles.scrollView}>
{/*
            <View style={[styles.trickTitleRow]}>
              {this.props.game.past[this.props.game.past.length-1].players.map(function (player, index) {
                return <Text style={styles.boldLabel} key={player.id}>{player.name}</Text>
              })}
            </View>
*/}

            <ListView dataSource={this.state.dataSource}
                      style={{ flex: 1 }}
                      renderRow={(row, sectionID, rowID, highlightRow) =>
                        <TrickRow {...row} id={rowID} maxPlayers={this.state.maxPlayers} present={this.state.present} playerNames={this.state.playerNames} trickCount={this.state.trickCount} />}
                      initialPageSize={10}
                      pageSize={5}
                      refreshControl={
                        this.props.onRefresh &&
                        <RefreshControl
                          refreshing={this.props.isRefreshing}
                          onRefresh={this.props.onRefresh}
                        />
                      }
                      onEndReachedThreshold={1200}
                      onEndReached={this.props.onEndReached}
            />
          </View>
      );
    } else {
      return this._renderNoResults();
    }
  }

  _renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={Colors.midGrey} />
      </View>
    );
  }

  _renderNoResults() {
    return <View />;
  }
}

const { width, height } = Dimensions.get('window');

const Metrics = {
  marginHorizontal: 10,
  marginVertical: 10,
  section: 25,
  baseMargin: 10,
  doubleBaseMargin: 20,
  smallMargin: 5,
  horizontalLineHeight: 1,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: (Platform.OS === 'ios') ? 64 : 54,
  buttonRadius: 4,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 60
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 300
  }
}

var styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingBottom: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trickTitleRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 30,
    backgroundColor: Colors.background1c,
    //margin: 5,
    //marginBottom: 20
    //paddingVertical: 10
  },
  trickTitle: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center',
    //marginBottom: Metrics.smallMargin
  },
  scrollView: {
    //height: height,
    flex: 1,
    //flexDirection: 'row',
    //height: 500
  }
});
