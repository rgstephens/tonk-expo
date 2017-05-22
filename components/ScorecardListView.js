/**
 * @providesModule ScorecardListView
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
import { Ionicons, Foundation } from '@exponent/vector-icons';

const { ExponentUtil } = NativeModules;

import { connect } from 'react-redux';
import { withNavigation } from '@exponent/ex-navigation';
import PlayerCard from 'PlayerCard';

import Actions from 'Actions';
import AppDataApi from 'AppDataApi';
import Alerts from 'Alerts';
import Colors from 'Colors';
import Layout from 'Layout';
import { RegularText } from 'StyledText';
//import type { AppData } from 'SharedTypes';

type Props = {
  players: Array<AppData>,
  isRefreshing: boolean,
  onRefresh: () => void,
  onEndReached: () => void,
};

type State = {
  playerCount: number,
  isLoadingApp: boolean,
  dataSource: ListView.DataSource,
};

let i = 0;

@connect()
@withNavigation
export default class ScorecardListView extends React.Component {
  state: State;

  constructor(props, context) {
    super(props, context);
    //console.log('constructor props.game: ' + JSON.stringify(props.game));
    //console.log('constructor props.undercutScoringXX: ' + JSON.stringify(props.undercutScoringXX));

    let dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    if (props.game) {
      dataSource = dataSource.cloneWithRows(props.game.players);
    }

    this.handleUndercut = this.handleUndercut.bind(this);

    this.state = {
      playerCount: props.game.players.length,
      isLoadingApp: false,
      undercutScoring: false,
      undercutWinnerId: null,
      undercutLoserId: null,
      dataSource,
    };
    //console.log('constructor this.state: ' + JSON.stringify(this.state));
  }

  componentWillReceiveProps(nextProps) {
    //console.log('ScorecardListView/componentWillReceiveProps');
    //console.log('ScorecardListView/componentWillReceiveProps, this.props: ' + JSON.stringify(this.props.game));
    //console.log('ScorecardListView/componentWillReceiveProps, nextProps: ' + JSON.stringify(nextProps.game));
    if (nextProps.game !== this.props.game) {
      //console.log('ScorecardListView/componentsWillReceiveProps **players changed** updating datasource');
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.game.players),
      });
    }
  }

  componentDidMount() {
    //this.setState({ playerCount: this.state.playerCount + 1 });
    //AppState.addEventListener('change', this._handleAppStateChange);
  }

  postUndercut(winner, loser) {
    console.log('ScorecardListView/postUndercut');
    // dispatch
    this.props.dispatch(Actions.undercut(winner, loser));
  }

  handleUndercut = (win, loss) => {
    //console.log('ScorecardListView/handleundercut, win: ' + JSON.stringify(win));
    if (win != null) {
      this.setState({undercutWinnerId: win});
      if (this.state.undercutLoserId) {
        this.postUndercut(win, this.state.undercutLoserId);
        // reset undercut state
        this.setState({undercutScoring: false, undercutWinnerId: null, undercutLoserId: null});
        this.forceUpdate();
      }
    } else if (loss != null) {
      this.setState({undercutLoserId: loss});
      if (this.state.undercutWinnerId) {
        this.postUndercut(this.state.undercutWinnerId, loss);
        // reset undercut state
        this.setState({undercutScoring: false, undercutWinnerId: null, undercutLoserId: null});
      }
    } else {
      // changing this.state.undercutScoring should cause ListView to re-render but it isn't working
      this.setState({undercutScoring: !this.state.undercutScoring, undercutWinnerId: null, undercutLoserId: null});
      // dispatch this to force property update
      this.props.dispatch(Actions.bumpRowchange());
    }
  }

/*
  shouldComponentUpdate(nextProps: Props): boolean {
    console.log('shouldComponentUpdate');
    return false;
  }
*/

  render() {
    //console.log('ScorecardListview/render this.state: ' + JSON.stringify(this.state));
    //console.log('rowCount: ' + this.state.dataSource.getRowCount());
    if (this.state.dataSource.getRowCount() > 0) {
      const undercutScoring = this.state.undercutScoring;
      //console.log('ScorecardListView/render, this.state.undercutScoring: ' + this.state.undercutScoring + '/' + undercutScoring);
      //console.log('ScorecardListView/render, this.state.undercutWinnerId: ' + this.state.undercutWinnerId);
      //console.log('ScorecardListView/render, this.state.undercutLoserId: ' + this.state.undercutLoserId);
      //console.log('ScorecardListView/render, this.props.game: ' + JSON.stringify(this.props.game));
      const numActive = this.props.game.players.filter((player) => player.active).length;
      //console.log('ScorecardListView/render, numActive: ' + numActive);
      return (
        <View style={{ flex: 1 }}>
          <ListView dataSource={this.state.dataSource}
                    style={{ flex: 1 }}
                    renderRow={(row, sectionID, rowID, highlightRow) =>
                      <PlayerCard {...row} id={rowID} onUndercutChange={this.handleUndercut} undercutScoring={this.state.undercutScoring}
                                  undercutLoser={this.state.undercutLoserId} undercutWinner={this.state.undercutWinnerId} />}
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
          {this.state.isLoadingApp && this._renderLoading()}
          <View style={{backgroundColor: 'white', height: 100, flexDirection: 'row', justifyContent: 'space-between'}}>
            {/* Rest of the app comes ABOVE the action button component !*/}
            <ActionButton buttonColor="#1abc9c" buttonTextStyle={styles.btnText} position="left" buttonText={'$' + this.props.game.stakes.toString()}>
{/*
              <ActionButton.Item buttonColor='#1abc9c' title="Enter Bet" onPress={() => this.props.dispatch(Actions.betIncrease()) }>
                <TextInput style={styles.btnText} selectTextOnFocus={true}
                           autoCorrect={false}
                           value={this.props.game.stakes.toString()} underlineColorAndroid='rgba(0,0,0,0)' autoCapitalize='words'
                           onChangeText={(amount) => this.props.dispatch(Actions.setBet(amount))}
                />
              </ActionButton.Item>
*/}
              <ActionButton.Item buttonColor='#1abc9c' title="Increase Bet" onPress={() => this.props.dispatch(Actions.betIncrease()) }>
                <Ionicons name="ios-arrow-up" size={24} color="white" />
              </ActionButton.Item>
              <ActionButton.Item buttonColor='#1abc9c' title="Decrease Bet" onPress={() => this.props.dispatch(Actions.betDecrease()) }>
                <Ionicons name="ios-arrow-down" size={24} color="white" />
              </ActionButton.Item>
            </ActionButton>
            <ActionButton buttonColor="#3498db" style={{}}>
              <ActionButton.Item buttonColor='rgba(231,76,60,1)' title="Reset Scores" onPress={() => this.props.dispatch(Actions.resetScores()) }>
                <Foundation name="dollar" size={24} color="white" style={styles.actionButtonIcon} />
              </ActionButton.Item>
              <ActionButton.Item buttonColor='rgba(231,76,60,1)' title="Reset Game" onPress={() => this.props.dispatch(Actions.resetGame()) }>
                <Ionicons name="md-trash" size={24} color="white" />
              </ActionButton.Item>
              { numActive < 5 ?
                <ActionButton.Item buttonColor='#9b59b6' title="Add Player" onPress={() => this.props.dispatch(Actions.addPlayer()) }>
                  <Ionicons name="md-add" size={24} color="white" />
                </ActionButton.Item>
                : '' }
            </ActionButton>
          </View>
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
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
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
  appContainer: {
    overflow: 'hidden',
    flexDirection: 'row',
    flex: 1,
    paddingTop: 10,
    paddingBottom: 8,
    borderBottomWidth: 3 / PixelRatio.get(),
    borderBottomColor: '#eee',
  },
  appTextDescription: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  targetBuild: {
    opacity: 0.4,
    paddingBottom: 2,
  },
  viewCount: {
    opacity: 0.4,
  },
  targetBuildText: {
    fontSize: 12,
  },
  viewCountText: {
    fontSize: 12,
  },
  creator: {
    position: 'absolute',
    right: 0,
    width: 70,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    fontSize: 11,
    opacity: 0.4,
    width: 50,
    textAlign: 'center',
  },
  avatarContainer: {
    width: 30,
    height: 30,
    marginBottom: 5,
    borderRadius: 15,
    backgroundColor: '#eee',
  },
  avatar: {
    width: 30,
    height: 30,
    marginBottom: 5,
    borderRadius: 15,
  },
  cancelButton: {
    color: 'white',
    flex: 1,
    fontSize: 25,
    marginLeft: 20,
  },
  appTitle: {
    fontSize: 16,
    color: Colors.tintColor,
    width: Layout.window.width - 70,
    flex: 1,
  },
  cardStyle: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 2,
    borderColor: '#ffffff',
    borderWidth: 1,
    marginTop: 3,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 8,
    shadowColor: 'rgba(0, 0, 0, 0.22)',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 2
    },
    elevation: 10,
  },

  // child of cardStyle
  cardTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    //marginBottom: 20
    //paddingVertical: 10
  },

  cardTitle: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'white',
    padding: 4,
    fontSize: 18,
    color: Colors.black,
    fontWeight: 'bold',
  },

  // child of cardTitleContainer
  nameInput: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 5,
    height: 30,
    backgroundColor: 'transparent',
    padding: 4,
    fontSize: 16,
    color: Colors.black,
    fontWeight: 'bold',
  },

  // child of cardTitleContainer
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
    elevation: 2
  },
  colorPlus: {
    backgroundColor: Colors.mediumAquamarine,
  },
  colorMinus: {
    backgroundColor: Colors.fire,
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

  // child of cardStyle
  buttonRowStyle: {
    flex: 1,
    flexDirection: 'row',
    padding: 10 // TextView padding not handled well on Android https://github.com/facebook/react-native/issues/3233
  },

  // child of
  buttonRowSpaceBetween: {
    justifyContent: 'space-between'
  },

  // child of
  buttonRowCenter: {
    justifyContent: 'center'
  },

  // child of buttonRowStyle
  buttonStyle: {
    borderRadius: 3,
    paddingLeft: 5,
    paddingRight: 5,
    paddingVertical: 2
  },

  // child of buttonStyle
  buttonOn: {
    backgroundColor: Colors.background
  },

  // child of buttonStyle
  buttonOnLose: {
    backgroundColor: 'red'
  },

  // child of buttonStyle
  buttonTextOn: {
    color: 'white'
  },

  // child of buttonStyle
  buttonText: {
    paddingLeft: 5,
    paddingRight: 5
  },

  btnText: {
    marginTop: -4,
    fontSize: 18,
    backgroundColor: 'transparent',
    textAlign: 'center',
    color: 'white'
  },

  containerOrig: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  row: {
    flex: 1,
    flexBasis: 100,
    height: 80,
    alignSelf: 'stretch',
    justifyContent: 'center',
    margin: Metrics.baseMargin,
    backgroundColor: Colors.fire,
    borderRadius: Metrics.smallMargin
  },
  cardImage: {
    flex: 1,
    height: 40,
  },
  cardTitleContainerPlus:{
    flex: 1,
    height: 60,
    backgroundColor: Colors.mediumAquamarine,
  },
  cardTitleContainerMinus:{
    flex: 1,
    height: 60,
  },
  cardTitle2:{
    position: 'absolute',
    top: 120,
    left: 26,
    backgroundColor: 'transparent',
    padding: 16,
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold',
  },
  rowPlus: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: Metrics.baseMargin,
    backgroundColor: Colors.mediumAquamarine,
    borderRadius: Metrics.smallMargin
  },
  rowMinus: {
    flex: 1,
    flexBasis: 100,
    height: 80,
    alignSelf: 'stretch',
    justifyContent: 'center',
    margin: Metrics.baseMargin,
    backgroundColor: Colors.fire,
    borderRadius: Metrics.smallMargin
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  label: {
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center'
  },
  buttonContent: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  button: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    shadowRadius: 2,
    shadowOffset: {
      width: 2,
      height: 4
    },
    shadowOpacity: .7,
    borderStyle: 'solid',
    borderTopWidth: 1,
    padding: 10
  },
  buttonTeal: {
    backgroundColor: MKColor.Teal,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: .7,
    borderStyle: 'solid',
    borderTopWidth: 1,
    padding: 10
  },
  buttonTextWhite: {
    color: 'white',
    fontWeight: 'bold'
  },
  buttonTextBlack: {
    color: 'black',
    fontWeight: 'bold'
  },
  plusButtonStyle: {
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 15,
    marginRight: 15,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'red',
    shadowColor: 'black',
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: .7,
    elevation: 3
  },
  regularButtonStyle: {
    flexGrow: 1,
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 30,
//    width: 110,
    height: 30,
    borderRadius: 2,
    shadowColor: 'black',
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: .7
  },

  // child of buttonRowStyle
  buttonLeftStyle: {
//    alignSelf: 'flex-start',
    backgroundColor: Colors.background
  },

  // child of buttonRowStyle
  buttonRightStyle: {
//    alignSelf: 'flex-end',
    backgroundColor: Colors.background1b
  },

  buttonText: {
    color: 'white'
  },
});
