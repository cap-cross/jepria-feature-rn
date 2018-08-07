import React from 'react';
import PropTypes from 'prop-types';
import {TouchableHighlight, TouchableOpacity, FlatList, Text, View, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import log from '@cap-cross/cap-core';

class PickerTouchableItem extends React.PureComponent {
  
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.checked
    };
  }

  defaultStyles = {
    item: {
      borderBottomColor: 'rgba(255,255,255,0.25)', 
    },
    itemText: {
      color: 'white', 
    },
    iconColor: 'white'
  };
  customStyles = getStyles('PickerTouchableItem');
  
  onPress = () => {
    this.setState({checked: !this.state.checked});
    this.props.onChange({name: this.props.name, value: this.props.value});
  }
  
  render() {
    const {name} = this.props;
    const {checked} = this.state;
    let styles = this.customStyles !== undefined ? this.customStyles : this.defaultStyles;
    return (
      <TouchableOpacity
        style={{...styles.item, borderBottomWidth: 1, padding: 15, backgroundColor: 'transparent',}}
        underlayColor='f00'
        onPress={() => {
          this.onPress();
        }}
        >
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Text 
            style={{...styles.itemText, textAlign: 'center', fontSize:14, flex: 1,}}>
              {name}
            </Text>
            {checked && <Icon name="radio-button-checked" size={20} color={styles.iconColor} style={{paddingRight: 10}}/>}
            {!checked && <Icon name="radio-button-unchecked" size={20} color={styles.iconColor} style={{paddingRight: 10}} />}
          </View>
      </TouchableOpacity>
    );
  }
}

export default class Picker extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selected : this.props.input.value,
      name: '',
      isChecking: false,
    }
  }  

  defaultStyles = {
    card: {
      marginVertical: 7,
      borderBottomColor: 'white', 
      borderBottomWidth:1
    },
    fieldCaption: {
      margin: 7,
      color: 'white', 
      fontSize: 12, 
      opacity: 0.75
    },
    valueContainer: {
      paddingHorizontal: 15, 
      paddingVertical: 7,
    },
    fieldValue: {
      color: 'white', 
      fontSize: 14,
      minHeight: 20
    },
    background: {
      backgroundColor: 'rgba(52,52,52,0.8)',
    },
    list: {
      backgroundColor: 'rgba(51,63,75,0.9)',
    },
    iconColor: 'white'
  };
  customStyles = getStyles('Picker');

  onItemPressed = (item) => {
    const {input:{onChange}} = this.props;
    const {name, value} = item;
    this.setState({...this.state, selected: value, name, isChecking: false});
    onChange(value);
  }

  renderListItem = ({item}) => (
    <PickerTouchableItem 
        key={item[this.props.itemValueKey]}
        name={item[this.props.itemNameKey]} 
        value={item[this.props.itemValueKey]} 
        checked={this.state.selected === item[this.props.itemValueKey]}
        onChange={this.onItemPressed}/>
  );

  render() {
    const {labelText, hasEmptyItem, input: {onChange, value, ...inputProps}, itemNameKey, itemValueKey} = this.props;
    let {items} = this.props;
    let {name, selected} = this.state;
    if (hasEmptyItem) items = [{[itemNameKey]: '', [itemValueKey]: ''}].concat(items);
    if (items.length > 0 && name === '' && selected !== '') {
      for(let item of items) {
        if (item[itemValueKey] === selected) {
          name = item[itemNameKey];
          break;
        }
      };
    }
    let styles = this.customStyles !== undefined ? this.customStyles : this.defaultStyles;
    return (
      <View>
        <TouchableOpacity 
            style={{...styles.card, flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}
            onPress={() => this.setState({...this.state, isChecking: true})} >
          <View style={{flex: 1}}>
            <View>
              <Text style={styles.fieldCaption}>{labelText}</Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={{...styles.fieldValue, flexWrap:'wrap'}}>{name}</Text>
            </View>
          </View>
          <View style={{justifyContent:'center', flex: 0}}>
            <Icon name='expand-more' color={styles.iconColor} size={30} />
          </View>
        </TouchableOpacity>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.isChecking}
          onRequestClose={() => this.setState({...this.state, isChecking: false})}>
          <TouchableOpacity 
          onPress={() => this.setState({...this.state, isChecking: false})} 
          style={{...styles.background, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{...styles.list, borderRadius: 15, maxHeight:'70%', width: '90%'}}>
              <FlatList 
                style={{margin: 20}}
                data={items}
                renderItem={this.renderListItem}
                keyExtractor={(item, index) => index.toString()}/>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}