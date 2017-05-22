/**
 * @providesModule PlayerCard
 * @flow
 */

import { connect } from 'react-redux';
import { withNavigation } from '@exponent/ex-navigation';
import React, { PropTypes } from 'react';
import { View, Text, TextInput, ListView, Image, Button, KeyboardAvoidingView, StyleSheet, TouchableHighlight, PixelRatio } from 'react-native';
import { getTheme, setTheme, MKButton, MKColor } from 'react-native-material-kit';
import Actions from 'Actions';

import Colors from 'Colors';
import Layout from 'Layout';
import Metrics from 'Metrics';

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
  winLossButton: {
    alignSelf: 'flex-end',
    width: 50,
    height: 30,
    paddingVertical: 5,
    marginBottom: 10,
    marginRight: 10,
    borderRadius: 3,
    shadowRadius: 2,
    shadowOpacity: .7,
    shadowColor: 'black',
    elevation: 2,
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
    elevation: 2
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
});

@connect()
@withNavigation
export default class PlayerCard extends React.Component {
  constructor(props) {
    //console.log('PlayerCard/constructor');
    super(props);
    //this.handleUndercutChange = this.handleUndercutChange.bind(this);
    this.state = props;

    //this.handlePressUndercut = this.handlePressCancelUndercut.bind(this);
    //console.log('Components/PlayerCard.constructor typeof onUndercutChange: ' + typeof(this.props.onUndercutChange));
    //console.log('Components/PlayerCard.constructor state: ' + JSON.stringify(this.state.undercutScoring));
    //this.handleUpdateName = this.handleUpdateName.bind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    console.log('PlayerCard/componentWillReceiveProps');
    //console.log('  undercut values: ' + this.props.undercutScoring + ' to ' + nextProps.undercutScoring);
    //console.log('nextProps.balance: ' + JSON.stringify(nextProps.balance));
    //console.log('this.props.balance: ' + JSON.stringify(this.props.balance));
    if (nextProps !== this.props) {
      //console.log('>> Properties changed, setState');
      console.log('>> oldProps: ' + JSON.stringify(this.props, ["id","name","balance","active","rowchange","undercutScoring","undercutWinner","undercutLoser"]));
      console.log('>> newProps: ' + JSON.stringify(nextProps, ["id","name","balance","active","rowchange","undercutScoring","undercutWinner","undercutLoser"]));
      this.setState({ ...nextProps });
    }
  }

/*
  shouldComponentUpdate() {
    console.log('PlayerCard/shouldComponentUpdate');
    return true;
  }
*/

/*
  handleUndercutChange() {
    console.log('handleUndercutChange undercutScoring: ' + this.props.undercutScoring);
    console.log('handleUndercutChange typeof onUndercutChange: ' + typeof(this.props.onUndercutChange));
    this.props.onUndercutChange(win);
  }
*/

  //const PlayerCard = (row, sectionId, rowId, highlightRow, undercutScoring, undercutLoser, undercutWinner) => (
  render() {
/*
    console.log('PlayerCard/render, state: ' + this.state.name + ' = ' + this.state.balance + ' ' +
      (this.state.undercutScoring ? 'undercutScoring, ' + this.state.undercutWinner + '/' + this.state.undercutLoser  : ''));
    console.log('PlayerCard/render, this.props.name: ' + this.props.name + ' = ' + this.props.balance);
*/
    return (
      <TouchableHighlight
        //onLongPress={() => this._shareApp(row)}
        //onPress={() => this._selectApp(row)}
      >
        <View style={styles.cardStyle}>
          <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={20}
                                style={[styles.cardTitleContainer, this.state.id == 0 ? styles.cardTitleBackgroundColor1 : this.state.id == 1 ? styles.cardTitleBackgroundColor2 : this.state.id == 2 ? styles.cardTitleBackgroundColor3 : this.state.id == 3 ? styles.cardTitleBackgroundColor4 : styles.cardTitleBackgroundColor5]}>
            <TextInput style={styles.nameInput} selectTextOnFocus={true}
                       autoCorrect={false}
                       value={this.state.name} underlineColorAndroid='rgba(0,0,0,0)' autoCapitalize='words'
                       onChangeText={(name) => this.props.dispatch(Actions.setName(this.state.id, name))}
            />
            <MKButton
              style={[styles.winLossButton]}>
              <Text
                style={styles.winLoss}>{this.state.won}-{this.state.lost}</Text>
            </MKButton>
            <MKButton
              style={[styles.balanceButton, this.state.balance > 0 ? styles.colorPlus : this.state.balance < 0 ? styles.colorMinus : null]}>
              <Text
                style={styles.balanceText}>{this.state.balance < 0 ? this.state.balance.toFixed(2) : '+' + this.state.balance.toFixed(2)}</Text>
            </MKButton>
          </KeyboardAvoidingView>
          <View style={[styles.buttonRowStyle, this.state.active ? styles.buttonRowSpaceBetween : styles.buttonRowCenter]}>
            { this.state.active && !this.state.undercutScoring ?
              <Button title="Won" onPress={() => {
                this.props.dispatch(Actions.won(this.state.id, 1))
              }}/>
              : null }
            { this.state.active && !this.state.undercutScoring ?
              <Button title="Double" onPress={() => { this.props.dispatch(Actions.won(this.state.id, 2)) }}/>
              : null }
            { this.state.active && !this.state.undercutScoring ?
              <Button title="Undercut" onPress={() =>
                this.props.onUndercutChange(null, null)
              }/>
              : null }
            { this.state.active && this.state.undercutScoring ?
              <Button title="Cancel" onPress={() => {
                this.props.onUndercutChange(null, null)
              }}/>
              : null }
            { this.state.active && this.state.undercutScoring && !this.state.undercutLoser && !this.state.undercutWinner && (this.state.undercutWinner == null) ?
              <Button title="Undercut Win" style={[styles.buttonStyle, this.state.undercutWinner ? styles.buttonOn : null]} onPress={() => {
                this.props.onUndercutChange(this.state.id, null)
              }}/>
              : null }
            { this.state.undercutLoser && (this.state.undercutLoser !== this.state.id) ?
              <Button title="Undercut Win" style={[styles.buttonStyle, this.state.undercutWinner ? styles.buttonOn : null]} onPress={() => {
                this.props.onUndercutChange(this.state.id, null)
              }}/>
              : null }
            { this.state.active && this.state.undercutScoring && !this.state.undercutWinner && !this.state.undercutLoser && (this.state.undercutLoser == null) ?
              <Button title="Undercut Lose" style={[styles.buttonStyle, this.state.undercutWinner ? styles.buttonOn : null]} onPress={() => {
                this.props.onUndercutChange(null, this.state.id)
              }}/>
              : null }
            { this.state.undercutWinner && (this.state.undercutWinner !== this.state.id) ?
              <Button title="Undercut Lose" style={[styles.buttonStyle, this.state.undercutWinner ? styles.buttonOn : null]} onPress={() => {
                this.props.onUndercutChange(null, this.state.id)
              }}/>
              : null }
            { this.state.active && !this.state.undercutScoring ?
              <Button title="Out" onPress={() => {
                this.props.dispatch(Actions.toggleActive(this.state.id))
              }}/>
              : null }
            { !this.state.active ?
              <Button title="In" style={styles.buttonStyle} onPress={() => {
                this.props.dispatch(Actions.toggleActive(this.state.id))
              }}/>
              : null }
{/*
            <Button title="State" style={styles.buttonStyle} onPress={() => {
              console.log('state: ' + JSON.stringify(this.state))
            }}/>
*/}
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
