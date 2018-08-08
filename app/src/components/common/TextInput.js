// TODO Устранить дублирование с LoginForm
import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, View, TextInput } from 'react-native';
import getStyles from '../../../res/styles'

export default class TextField extends React.PureComponent {
  static propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
  };

  defaultStyles = {
    card: {
      marginVertical: 7
    },
    fieldCaption: {
      margin: 7,
      color: 'white', 
      fontSize: 12, 
      opacity: 0.75
    },
    valueContainer: {
      paddingHorizontal: 15, 
      paddingBottom: 7, 
      borderBottomColor: 'white', 
      borderBottomWidth:1
    },
    valueContainerError: {
      paddingHorizontal: 15, 
      paddingBottom: 7, 
      borderBottomColor: 'red', 
      borderBottomWidth:1
    },
    fieldValue: {
      color: 'white', 
      fontSize: 14,
      borderColor: 'transparent'
    },
    notificationTextWarn: {
      color: 'white', 
      fontSize: 12, 
      opacity: 0.75,
    },
    notificationTextError: {
      color: 'red', 
      fontSize: 12,
    }
  }
  customStyles = getStyles('TextInput');

  render() {
    const { input, meta: {touched, error, warning}, labelText, ...inputProps } = this.props;
    let styles = this.customStyles !== undefined ? this.customStyles : this.defaultStyles;
    var notificationStyle = error !== undefined ? styles.notificationTextError : (warning !== undefined ? styles.notificationTextWarn : {});
    return (
      <View style={styles.card}>
        <View>
          <Text style={styles.fieldCaption}>{labelText}</Text>
        </View>
        <View style={(touched && error !== undefined)? styles.valueContainerError : styles.valueContainer}>
          <TextInput
            style={styles.fieldValue}
            onChangeText={input.onChange}
            onBlur={input.onBlur}
            onFocus={input.onFocus}
            value={input.value}
            style={styles.fieldValue}
            underlineColorAndroid='transparent'
            />
        </View>
        { touched && error != undefined && <Text style={styles.notificationTextError}>{error}</Text> }
        { touched && warning != undefined && <Text style={styles.notificationTextWarn}>{warning}</Text>}
      </View>
    );
  }
}
