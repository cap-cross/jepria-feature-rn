
import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity } from 'react-native';
import getStyles from '../../../res/styles'
import { Icon } from 'native-base';
import log from '@cap-cross/cap-core';
import {DARK_BLUE_COLOR, LIGHT_BLUE_COLOR} from '../../../res/style';

export default class PinView extends React.PureComponent {
  static propTypes = {
    onSuccess: PropTypes.func.isRequired,
    onFailure: PropTypes.func.isRequired,
    targetPin: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      pin: ''
    }
  }

  onButtonClick = (number) => {
    let newPin = this.state.pin + number;
    if (newPin.length === 4) {
      if (this.props.mode === 'verify') {
        if (newPin === this.props.targetPin) {
          this.setState({
            pin: newPin
          });
          this.props.onSuccess();
          return;
        } else {
          this.setState({pin: ''});
          this.props.onFailure();
          return;
        }
      } else {
        this.setState({
          pin: ''
        });
        this.props.onSuccess(newPin);
        return;
      }
    }
    this.setState({
      pin: newPin
    });
  }

  onDelete = () => {
    let pin = this.state.pin;
    this.setState({
      pin: pin.slice(0, pin.length - 1)
    });
  }

  defaultStyles = {
    header: {
      color: 'white',
      fontSize: 40,
      fontWeight: 'bold',
      margin: 15
    },
    emptyPinItem: {
      margin: 5,
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: 'white'
    },
    filledPinItem: {
      margin: 5,
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: LIGHT_BLUE_COLOR
    },
    button: {
      margin: 5,
      width: 75,
      height: 75,
      borderRadius: 75/2,
      backgroundColor: DARK_BLUE_COLOR,
    },
    buttonContent: {
      fontSize: 40,
      color: 'white'
    }
  }
  customStyles = getStyles('PinView');
    
  render() {
    let styles = this.customStyles !== undefined ? this.customStyles : this.defaultStyles;
    let length = this.state.pin.length;
    return (
      <View style={{alignItems: 'center'}}>
        <View style={{flex: 0, flexDirection: 'row', marginBottom: 30}}>
          <View style={length > 0 ? styles.filledPinItem : styles.emptyPinItem}/>
          <View style={length > 1 ? styles.filledPinItem : styles.emptyPinItem}/>
          <View style={length > 2 ? styles.filledPinItem : styles.emptyPinItem}/>
          <View style={length > 3 ? styles.filledPinItem : styles.emptyPinItem}/>
        </View>
        <View>
          <View style={{flex: 0, flexDirection: 'row'}}>
            <TouchableOpacity style={{...styles.button, justifyContent: 'center'}} onPress={() => this.onButtonClick('1')}>
              <Text style={{...styles.buttonContent, textAlign: 'center'}}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.button, justifyContent: 'center'}} onPress={() => this.onButtonClick('2')}>
              <Text style={{...styles.buttonContent, textAlign: 'center'}}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.button, justifyContent: 'center'}} onPress={() => this.onButtonClick('3')}>
              <Text style={{...styles.buttonContent, textAlign: 'center'}}>3</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 0, flexDirection: 'row'}}>
            <TouchableOpacity style={{...styles.button, justifyContent: 'center'}} onPress={() => this.onButtonClick('4')}>
              <Text style={{...styles.buttonContent, textAlign: 'center'}}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.button, justifyContent: 'center'}} onPress={() => this.onButtonClick('5')}>
              <Text style={{...styles.buttonContent, textAlign: 'center'}}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.button, justifyContent: 'center'}} onPress={() => this.onButtonClick('6')}>
              <Text style={{...styles.buttonContent, textAlign: 'center'}}>6</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 0, flexDirection: 'row'}}>
            <TouchableOpacity style={{...styles.button, justifyContent: 'center'}} onPress={() => this.onButtonClick('7')}>
              <Text style={{...styles.buttonContent, textAlign: 'center'}}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.button, justifyContent: 'center'}} onPress={() => this.onButtonClick('8')}>
              <Text style={{...styles.buttonContent, textAlign: 'center'}}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.button, justifyContent: 'center'}} onPress={() => this.onButtonClick('9')}>
              <Text style={{...styles.buttonContent, textAlign: 'center'}}>9</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 0, flexDirection: 'row'}}>
            <TouchableOpacity style={{...styles.button, justifyContent: 'center'}} onPress={() => this.onDelete()}>
              <Icon type='Ionicons' name='md-backspace' style={{...styles.buttonContent,  textAlign: 'center'}}/>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.button, justifyContent: 'center'}} onPress={() => this.onButtonClick('0')}>
              <Text style={{...styles.buttonContent, textAlign: 'center'}}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.button, justifyContent: 'center'}} onPress={() => alert('Not Supported now')}>
              <Icon type='Ionicons' name='md-finger-print' style={{...styles.buttonContent,  textAlign: 'center'}}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}