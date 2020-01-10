import React from 'react';

import { AppLoading } from 'expo';
import store from './app/src/redux/store';

import AppNavigator from './app/src/config/navigation';
import SecurityProvider from './app/src/context/SecurityContext';
import { LOGIN_API_URL, META_INFO_URL } from './app/src/api/ApiConfig';
import { Provider } from 'react-redux';
import { Root } from 'native-base';

import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import * as SecureStore from 'expo-secure-store';

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

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
    });
    await Asset.fromModule(require('./assets/images/background.jpg')).downloadAsync();
    const {pin, token} = await this.prepareContext();
    this.setState({pin, token, isReady: true });
  }

  prepareContext = async () => {
    const pin = await SecureStore.getItemAsync("userPin");
    const token = await SecureStore.getItemAsync("userToken");
    return {pin, token}
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
      <SecurityProvider userPin={this.state.pin} userToken={this.state.token} loginURL={LOGIN_API_URL} metaInfoUrl={META_INFO_URL} roles={["JrsAssignResponsibleFeature"]}>
        <Provider store={store}>
          <Root>
            <AppNavigator />
          </Root>
        </Provider>
      </SecurityProvider>
    );
  }
}