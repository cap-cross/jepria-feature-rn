import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import {LIGHT_AQUA_GREEN_COLOR} from '../../../../res/style';
import { SecurityContext } from '../../../context/SecurityContext';

export default AuthLoadingScreen = ({navigation}) => {
  const {token} = useContext(SecurityContext);

  if (token) {
    navigation.navigate("Verify");
  } else {
    navigation.navigate("Auth");
  }

  return (
    <View style={{
      flex: 1, 
      backgroundColor: '#175767',
      justifyContent: 'center', 
      alignItems: 'center',}}>
      <ActivityIndicator size='large' color={LIGHT_AQUA_GREEN_COLOR}/>
    </View>
  );
}
