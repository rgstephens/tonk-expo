/**
 * @providesModule Router
 * @flow
 */

import { createRouter } from '@exponent/ex-navigation';

import ExploreScreen from 'ExploreScreen';
import MyAppsScreen from 'MyAppsScreen';
import HistoryScreen from 'HistoryScreen';
import ScorecardScreen from 'ScorecardScreen';
import AboutScreen from 'AboutScreen';
import DrawerNavigationLayout from 'DrawerNavigationLayout';
import TabNavigationLayout from 'TabNavigationLayout';
import AuthenticationScreen from 'AuthenticationScreen';

export default createRouter(() => ({
  explore: () => ExploreScreen,
  myApps: () => MyAppsScreen,
  history: () => HistoryScreen,
  scorecard: () => ScorecardScreen,
  about: () => AboutScreen,
  drawerNavigationLayout: () => DrawerNavigationLayout,
  tabNavigationLayout: () => TabNavigationLayout,
  authentication: () => AuthenticationScreen,
}));
