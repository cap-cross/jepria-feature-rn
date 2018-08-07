// TODO Устранить дублирование с LoginForm
import React from 'react';
import PropTypes from 'prop-types';
import { Card, Input, Item, Label, View, Icon } from 'native-base';
import { Text } from 'react-native';
import getStyles from '../../../../res/styles'

export default class TextInput extends React.PureComponent {
  static propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
  };

  defaultStyles = {
    container: {
      marginVertical: 7,
      backgroundColor: 'rgba(17,49,85,0.55)', 
      borderRadius: 30, 
      height: 60, 
      marginHorizontal: 30, 
      paddingHorizontal: '10%', 
      paddingVertical: 5
    },
    error: {
      borderColor: 'red', 
      borderWidth: 1,
    },
    icon: {
      color: 'red', 
      fontSize: 30,
    },
    inputTextColor: {
      color: 'white'
    },
    placeholderTextColor: 'rgba(255,255,255,0.55)'
  }

  customStyles = getStyles('LoginTextInput');

  render() {
    const { input, meta: { touched, error}, labelText, ...inputProps } = this.props;
    let styles = this.customStyles !== undefined ? this.customStyles : this.defaultStyles;
    
    return (
      <View style={touched && error ? {...styles.container, ...styles.error} : styles.container}>
        <Item error={touched && error !== undefined} style={{borderColor: 'transparent'}}>
            <Input
              onChangeText={input.onChange}
              onBlur={input.onBlur}
              onFocus={input.onFocus}s
              value={input.value}
              {...inputProps}
              style={styles.inputTextColor}
              placeholderTextColor={styles.placeholderTextColor}
            />
            {touched && error && <Icon name="error" type="MaterialIcons" style={styles.icon}/>}
        </Item>
      </View>
    );
  }
}
