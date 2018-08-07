import React from 'react';
import PropTypes from 'prop-types';
import {TouchableHighlight, TouchableOpacity, FlatList, Text, View, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import log from '@cap-cross/cap-core';

class TouchableItem extends React.PureComponent {
  
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.checked
    };
  }

  styles = {
    item: {
      padding: 15,
      borderBottomColor: 'rgba(255,255,255,0.25)', 
      borderBottomWidth: 1,
      backgroundColor: 'transparent', 
    },
    itemText: {
      textAlign: 'center',
      color: 'white', 
      fontSize: 14
    },
  };
  
  onPress = () => {
    this.props.onChange({name: this.props.name, value: this.props.value, checked: !this.state.checked});
    this.setState({checked: !this.state.checked});
  }
  
  render() {
    const {name} = this.props;
    const {checked} = this.state;
    return (
        <TouchableOpacity
        style={this.styles.item}
        underlayColor='f00'
        onPress={() => {
          this.onPress();
        }}
        >
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Text 
            style={{textAlign: 'center', color: 'white', fontSize:14, flex: 1,}}>
              {name}
            </Text>
            {checked && <Icon name="check-box" size={20} color='white' style={{paddingRight: 10}}/>}
            {!checked && <Icon name="check-box-outline-blank" size={20} color='white' style={{paddingRight: 10}} />}
          </View>
        </TouchableOpacity>
    );
  }
  }

export default class MultiselectionList extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selected : this.props.input.value != '' ? this.props.input.value : [],
      names : [],
      isChecking: false,
    };
  }

  styles = {
    card: {
      marginVertical: 7,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
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
  };

  onClose = () => {
    this.setState({
      selected : this.props.input.value != '' ? this.props.input.value : [],
      names : [],
      isChecking: false,
    });
  }

  onItemPressed = (item) => {
    let {selected, names} = this.state;
    const {name, value, checked} = item;
    if (checked) {
      if (selected.indexOf(value) === -1) {
        selected.push(value);
        names.push(name);
      }
    } else {
      let index = selected.indexOf(value);
      if (index != -1) {
        selected.splice(index, 1);
        names.splice(names.indexOf(name), 1);
      }
    }
    this.setState({...this.state, selected, names});
  }

  onChangeSelectionPress = () => {
    const {input:{onChange}} = this.props;
    const {selected} = this.state;
    this.setState({...this.state, isChecking: false});
    onChange(selected);
  };

  renderListItem = ({item}) => (
    <TouchableItem 
        key={item.statusCode}
        name={item.statusName} 
        value={item.statusCode} 
        checked={this.state.selected.indexOf(item.statusCode) != -1}
        onChange={this.onItemPressed}/>
  );

  render() {
    const {labelText, input: {onChange, value, ...inputProps}, items} = this.props;
    const {selected, names} = this.state;
    if (selected.length > 0 && names.length == 0) {
      if (items.length > 0) {
        items.forEach((item) => {
          if (selected.indexOf(item.statusCode) != -1) {
            names.push(item.statusName);
          }
        });
      }
    }
    return (
      <View>
        <TouchableOpacity 
            style={this.styles.card}
            onPress={() => this.setState({...this.state, isChecking: true})} >
          <View style={{flex: 1}}>
            <View>
              <Text style={this.styles.fieldCaption}>{labelText}</Text>
            </View>
            <View style={this.styles.valueContainer}>
              <Text style={{...this.styles.fieldValue, flexWrap:'wrap'}}>{names.toString()}</Text>
            </View>
          </View>
          <View style={{justifyContent:'center', flex: 0}}>
            <Icon name='expand-more' color='white' size={30} />
          </View>
        </TouchableOpacity>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.isChecking}
          onRequestClose={() => this.onClose()}>
          <TouchableOpacity onPress={() => this.onClose()} style={{backgroundColor: 'rgba(52,52,52,0.8)', flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%'}}>
            <View style={{borderRadius: 15, backgroundColor: 'rgba(51,63,75,0.9)', maxHeight:'70%', width: '90%'}}>
              <FlatList 
                style={{margin: 20}}
                data={items}
                renderItem={this.renderListItem}
                keyExtractor={(item, index) => index.toString()}/>
              <TouchableHighlight 
                onPress={this.onChangeSelectionPress} 
                style={{borderBottomRightRadius: 15, borderBottomLeftRadius: 15, backgroundColor: '#7D92A5', height:45, justifyContent:'center'}}>
                <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>ВЫБРАТЬ</Text>
              </TouchableHighlight>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}