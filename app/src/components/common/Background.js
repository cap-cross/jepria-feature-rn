import React, { Component } from 'react';
import {
  ImageBackground, View
} from 'react-native';
const bgimage = require('../../../../assets/images/background.jpg');

export default Background = ({children}) => {
  return (
    <ImageBackground
      style={{
        flex: 1,
      }}
      blurRadius={1}
      source={bgimage}>
      <View style={{backgroundColor: 'rgba(17,49,85,0.4)', flex: 1}}>
        {children}
      </View>
    </ImageBackground>
  );
}