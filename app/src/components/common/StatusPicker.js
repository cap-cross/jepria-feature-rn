// TODO Устранить дублирование с LoginForm
import React from 'react';
import PropTypes from 'prop-types';
import { Card, InputGroup, Item, Label, Picker } from 'native-base';

export default class StatusPicker extends React.PureComponent {
  static propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {labelText, input: {onChange, value, ...inputProps}} = this.props;
    const items = this.props.items;
    let pickerItems = [];
    if (items.length > 0){
      items.map( item => (pickerItems.push(<Picker.Item key={item.statusCode} label={item.statusName} value={item.statusCode} />))); 
    }
    return (
      <Card>
        <Item>
          <Label>{labelText}:</Label>
            <Picker
                iosHeader="Select one"
                selectedValue={value}
                onValueChange = {(value) => {
                  onChange(value);
                }}>
                {pickerItems}
            </Picker>
        </Item>
      </Card>
    );
  }
}
