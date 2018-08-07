// TODO Устранить дублирование с TextInput
import React from 'react';
import PropTypes from 'prop-types';
import { Item, Input, View, Text, Icon } from 'native-base';

export default class TextInput extends React.PureComponent {
  static propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
  };

  styles = {
    container: {
      marginVertical: 7,
      backgroundColor: 'rgba(17,49,85,0.55)', 
      borderRadius: 30, 
      height: 60, 
      marginHorizontal: 30, 
      paddingHorizontal: '10%', 
      paddingVertical: 5
    },
  }

  render() {
    const { input, meta: { touched, error}, labelText, ...inputProps } = this.props;
    // TODO multiline, numberOfLines введены только для работы в Expo (проверить)
    // На Android при этом приходится вертикально скроллить, если содержимое не вмещается в
    // отведённое число строк. На iPhone всё нормально - отображается всё содержимое.
    // Это искажает отображение пустых форм - поля располагаются слишком близко - исправить для Expo
    var notificationStyle = {color: 'red'};
    return (
      <View style={touched && error ? {...this.styles.container, borderColor: 'red', borderWidth: 1} : this.styles.container}>
        <Item error={touched && error !== undefined} style={{borderColor: 'transparent'}}>
            <Input
              onChangeText={input.onChange}
              onBlur={input.onBlur}
              onFocus={input.onFocus}s
              value={input.value}
              {...inputProps}
              style={{color: 'white'}}
              secureTextEntry
              placeholderTextColor='rgba(255,255,255,0.55)'
            />
            {touched && error && <Icon name="error" type="MaterialIcons" style={{color: 'red', fontSize: 30}}/>}
        </Item>
      </View>
    );
  }
}

