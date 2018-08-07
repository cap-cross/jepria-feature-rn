import React from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator, Modal, Text } from 'react-native';
import log from '@cap-cross/cap-core';
import {LIGHT_AQUA_GREEN_COLOR} from '../../../res/style';

export const LoadingPanel = (props) => {
  return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.show}
        onRequestClose={() => log.trace("No close!")}>
        <View style={{
        backgroundColor: 'rgba(52,52,52,0.8)',
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',}}>
          <ActivityIndicator size='large' color={LIGHT_AQUA_GREEN_COLOR}/>
          <Text style={{margin: 15, textAlign: 'center', color: LIGHT_AQUA_GREEN_COLOR}}>{props.text}</Text>
        </View>
      </Modal>
    );
}