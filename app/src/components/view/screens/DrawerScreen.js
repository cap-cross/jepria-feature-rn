import React from 'react';
import { View, Text, ImageBackground } from 'react-native'
const bgimage = require('../../../../../assets/images/background.jpg');
import { DrawerNavigatorItems } from 'react-navigation-drawer';

export default function DrawerScreen (props){
  return (
    <ImageBackground
      style={{
        flex: 1,
      }}
      blurRadius={8}
      source={bgimage}
    >
      <View style={{backgroundColor: 'rgba(130,161,193,0.7)', flex: 0, height: '30%', justifyContent: 'center'}}>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
          <Text style={{textAlign: 'center', color: 'white', paddingBottom: 20, fontSize:60}}>J</Text>
          <Text style={{textAlign: 'center', color: 'white', paddingTop: 20, fontSize:60}}>R</Text>
        </View>
        <View>
          <Text style={{textAlign: 'center', color: 'white', fontSize:40}}>FEATURE</Text>
        </View>
      </View>
      <View style={{backgroundColor: 'rgba(169,196,224,0.7)', flex: 1}}>
        <DrawerNavigatorItems {...props}/>
      </View>
    </ImageBackground>
  );
};