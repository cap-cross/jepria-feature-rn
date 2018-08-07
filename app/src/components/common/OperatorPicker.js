// TODO Устранить дублирование с LoginForm
import React from 'react';
import PropTypes from 'prop-types';
import { InputGroup, Card, Item, Label } from 'native-base';
import { Text, StyleSheet, View, Picker } from 'react-native';

export default class OperatorPicker extends React.PureComponent {
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
      borderBottomWidth:2
    },
    valueContainerError: {
      paddingHorizontal: 15, 
      paddingBottom: 7, 
      borderBottomColor: 'red', 
      borderBottomWidth:2
    },
    fieldValue: {
      color: 'white', 
      //fontSize: 14,
      borderColor: 'transparent',
      height: 18
    },
    field: {
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
    const {labelText, input: {onChange, value, ...inputProps}} = this.props;
    const items = this.props.items;
    let pickerItems = [<Picker.Item key={"EMPTY_VALUE"} label={""} value={''} />];
    if (items.length > 0){
      items.map( item => (pickerItems.push(<Picker.Item key={item.operatorCode} label={item.operatorName} value={item.operatorCode} />))); 
    }
    return (
      <View style={this.styles.card}>
        <View>
          <Text style={this.styles.fieldCaption}>{labelText}</Text>
        </View>
        <View style={this.styles.valueContainer}>
          <Picker
                 selectedValue={value}
                 onValueChange = {(value) => {
                   onChange(value);
                 }}
                 style={this.styles.fieldValue}>
                 {pickerItems}
          </Picker>
        </View>
      </View>
      // <Card>
      //   <Item>
      //     <Label>{labelText}:</Label>
      //       <Picker
      //           iosHeader="Select one"
      //           selectedValue={value}
      //           onValueChange = {(value) => {
      //             onChange(value);
      //           }}>
      //           {pickerItems}
      //       </Picker>
      //   </Item>
      // </Card>
    );
  }
}
