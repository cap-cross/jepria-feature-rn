// TODO Устранить дублирование с LoginForm
import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, View, TextInput } from 'react-native';

export default class TextAreaField extends React.PureComponent {
  static propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
  };

  
  styles = StyleSheet.create({
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
  });

  render() {
    const { input, meta: {touched, error, warning}, labelText, ...inputProps } = this.props;
    // TODO multiline, numberOfLines введены только для работы в Expo (проверить)
    // На Android при этом приходится вертикально скроллить, если содержимое не вмещается в
    // отведённое число строк. На iPhone всё нормально - отображается всё содержимое.
    // Это искажает отображение пустых форм - поля располагаются слишком близко - исправить для Expo
    var notificationStyle = error !== undefined ? this.styles.notificationTextError : (warning !== undefined ? this.styles.notificationTextWarn : {});
    return (
      <View style={this.styles.card}>
        <View>
          <Text style={this.styles.fieldCaption}>{labelText}</Text>
        </View>
        <View style={ (touched && error !== undefined) ? this.styles.valueContainerError : this.styles.valueContainer}>
          <TextInput
            multiline={true}
            style={this.styles.fieldValue}
            onChangeText={input.onChange}
            onBlur={input.onBlur}
            onFocus={input.onFocus}
            value={input.value}
            style={this.styles.fieldValue}
            underlineColorAndroid='transparent'
            />
        </View>
        { touched && error != undefined && <Text style={this.styles.notificationTextError}>{error}</Text> }
        { touched && warning != undefined && <Text style={this.styles.notificationTextWarn}>{warning}</Text>}
      </View>
    );
  }
}
