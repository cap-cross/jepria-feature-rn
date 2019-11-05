import React from 'react';

import { AppLoading } from 'expo';
import store from './app/src/redux/store';

import AppNavigator from './app/src/config/navigation';
import DataProvider from './app/src/data/DataProvider';
import { Root } from 'native-base';

import * as Font from 'expo-font';
import { Asset } from 'expo-asset';

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
    };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      //Ionicons: Ionicons.font
    });
    //await this.cacheFonts([Ionicons.font, require('native-base/Fonts/Roboto.ttf'), require('native-base/Fonts/Roboto_medium.ttf')]);
    await Asset.fromModule(require('./assets/images/background.jpg')).downloadAsync();
    this.setState({ isReady: true });
  }

  cacheFonts = async (fonts) => {
    return fonts.map(font => Font.loadAsync(font));
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return (
       <DataProvider store={store}>
         <Root>
           <AppNavigator />
         </Root>
       </DataProvider>
    );
  }
}