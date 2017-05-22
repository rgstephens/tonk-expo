/**
 * @providesModule AboutScreen
 * @flow
 */

import React from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
Text,
} from 'react-native';
import { connect } from 'react-redux';

import Actions from 'Actions';
import Colors from 'Colors';
import { BoldText, RegularText } from 'StyledText';
import Router from 'Router';

@connect()
class SettingsButton extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 15,
        }}
        onPress={() => this.props.dispatch(Actions.signOut())}>
        <RegularText style={{ color: '#fff' }}>Sign Out</RegularText>
      </TouchableOpacity>
    );
  }
}

export default class AboutScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'About',
      renderRight() {
        if (Platform.OS === 'ios') {
          return <SettingsButton />;
        }
      },
    },
  };

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        automaticallyAdjustContentInsets={false}>
        <RegularText style={styles.heading}>
          Tonk Scorecard
        </RegularText>

        <Image
          style={styles.logo}
          source={require('../assets/images/cards.png')}
        />
        <RegularText style={styles.text}>

        </RegularText>

        <BoldText style={styles.title}>
          What is Tonk?
        </BoldText>

        <RegularText style={styles.text}>
          This is a score keeping app for the
          {' '}
          <RegularText style={styles.text} onPress={this._openTonkWiki} style={styles.linkText}>
            Tonk card game.
          </RegularText>
        </RegularText>

        <RegularText style={styles.text}>
          It is written in Javascript and React Native. The source code is available on GitHub.
        </RegularText>

        <BoldText style={styles.title}>
          Powered by React Native & Expo
        </BoldText>
        <RegularText style={styles.text}>
          This app was created with React Native & Expo.
          {' '}
          <RegularText onPress={this._openExponentDocs} style={styles.linkText}>
            Read the docs for Expo here.
          </RegularText>
        </RegularText>

        <BoldText style={styles.title}>
          Author
        </BoldText>
        <RegularText style={styles.text}>
          Greg Stephens - greg@udon.org
        </RegularText>

      </ScrollView>
    );
  }

  _onPressEmail = () => {
    Linking.openURL('mailto:info@rnplay.org');
  };

  _openExponentDocs = () => {
    Linking.openURL('https://expo.io');
  };

  _openTonkWiki = () => {
    Linking.openURL('https://en.wikipedia.org/wiki/Tonk_(card_game)');
  };
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  sendEmailText: {
    fontSize: 13,
    color: Colors.tintColor,
  },
  link: {
    color: Colors.tintColor,
  },
  emphasis: {
    fontStyle: 'italic',
  },
  logo: {
    height: 150,
    width: 150,
    marginBottom: 10,
    alignSelf: 'center',
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    color: Colors.darkGrey,
    marginBottom: 10,
  },
  text: {
    fontSize: 13,
    color: Colors.midGrey,
    marginBottom: 20,
  },
  otherQuestionsText: {
    fontSize: 13,
  },
  linkText: {
    color: Colors.tintColor,
  },
});
