/**
 * @providesModule TabNavigationLayout
 * @flow
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem,
} from '@expo/ex-navigation';
import { Ionicons } from '@expo/vector-icons';
import { Font } from 'expo';

import Colors from 'Colors';
import Router from 'Router';

const defaultRouteConfig = {
  navigationBar: {
    tintColor: Colors.navigationBarTintColor,
    backgroundColor: Colors.navigationBarBackgroundColor,
    titleStyle: Font.style('open-sans'),
  },
};

type TabRenderFunction = (isSelected: boolean) => ReactElement<any>;

export default class TabNavigationLayout extends React.Component {
  render() {
    return (
      <TabNavigation
        tabBarColor={Colors.tabBar}
        tabBarHeight={56}
        initialTab="scorecard">

        <TabNavigationItem
          id="scorecard"
          renderIcon={isSelected =>
            this._renderIcon('Scorecard', 'ios-calculator-outline', isSelected)}>
          <StackNavigation
            defaultRouteConfig={defaultRouteConfig}
            initialRoute={Router.getRoute('scorecard')}
          />
        </TabNavigationItem>

{/*
        <TabNavigationItem
          id="history"
          renderIcon={isSelected =>
            this._renderIcon('History', 'ios-list-outline', isSelected)}>
          <StackNavigation
            defaultRouteConfig={defaultRouteConfig}
            initialRoute={Router.getRoute('history')}
          />
        </TabNavigationItem>
*/}

        <TabNavigationItem
          id="about"
          renderIcon={isSelected =>
            this._renderIcon('About', 'ios-help-circle-outline', isSelected)}>
          <StackNavigation
            defaultRouteConfig={defaultRouteConfig}
            initialRoute={Router.getRoute('about')}
          />
        </TabNavigationItem>
      </TabNavigation>
    );
  }

  _renderIcon(
    title: string,
    iconName: string,
    isSelected: boolean
  ): ReactElement<any> {
    let color = isSelected ? Colors.tabIconSelected : Colors.tabIconDefault;

    return (
      <View style={styles.tabItemContainer}>
        <Ionicons name={iconName} size={32} color={color} />

        <Text style={[styles.tabTitleText, { color }]} numberOfLines={1}>
          {title}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabTitleText: {
    fontSize: 11,
  },
});
