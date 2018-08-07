/* eslint-disable react/prefer-stateless-function */
import React from 'react';

import Expo from 'expo';

import resources from '../res/strings';
import configureI18n from './config/i18n';
import configureStore from './config/store';

import ScreenManager from './components/view/ScreenManager';
import DataProvider from './data/DataProvider';
import { Root } from 'native-base';

import log from '@cap-cross/cap-core';
import {Util} from '@cap-cross/cap-react-native';

// @withStatusBar('#1b2428')
// //export default class FeatureApp extends React.Component<MyProps, MyState> {
export default class FeatureApp extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
    };

    log.trace('Util = ...');
    // log.trace('Util = ' + Util);
    console.log('Util = ' + Util);
    // log.trace('Util.platformOS() = ' + Util.platformOS());
    console.log('Util.platformOS() = ' + Util.platformOS());
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf'),
    });

    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }

    return (
       <DataProvider store={configureStore()} i18n={configureI18n(resources)}>
         <Root>
           <ScreenManager />
         </Root>
       </DataProvider>
    );
  }
}
