import React, { Component } from 'react';
import {
  ImageBackground, View,Text
} from 'react-native';
import {DARK_BLUE_COLOR} from '../../../res/style';
const bgimage = require('../../../../assets/images/background.jpg');

export default class Background extends Component {
  render() {
    const resizeMode = 'stretch';

    return (
      <ImageBackground
        style={{
          flex: 1,
          //resizeMode,
        }}
        blurRadius={1}
        source={bgimage}
      >
        <View style={{backgroundColor: 'rgba(17,49,85,0.4)', flex: 1}}>
            {this.props.children}
        </View>
      </ImageBackground>
    );
  }
}