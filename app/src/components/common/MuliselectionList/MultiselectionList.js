import React from 'react';
import {TouchableHighlight, TouchableOpacity, FlatList, Text, View, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import getStyles from '../../../../res/styles'

class MultiSelectionListTouchableItem extends React.PureComponent {
  
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

  customStyles = getStyles('PickerItem');
  
  onPress = () => {
    this.props.onChange({name: this.props.name, value: this.props.value, checked: !this.state.checked});
    this.setState({checked: !this.state.checked});
  }
  
  render() {
    const {name} = this.props;
    const {checked} = this.state;
    let styles = this.customStyles !== undefined ? this.customStyles : this.defaultStyles;
    return (
        <TouchableOpacity
        style={{...styles.item, borderBottomWidth: 1, padding: 15, backgroundColor: 'transparent',}}
        underlayColor='f00'
        onPress={this.onPress}
        >
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Text 
            style={{...styles.itemText, textAlign: 'center', fontSize:14, flex: 1,}}>
              {name}
            </Text>
            {checked && <Icon name="check-box" size={20} color={styles.iconColor} style={{paddingRight: 10}}/>}
            {!checked && <Icon name="check-box-outline-blank" size={20} color={styles.iconColor} style={{paddingRight: 10}} />}
          </View>
        </TouchableOpacity>
    );
  }
  }

export default class MultiSelectionList extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selected : this.props.input.value != '' ? this.props.input.value : [],
      names : [],
      isChecking: false,
    };
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
    submitButton: {
      backgroundColor: '#7D92A5',
    },
    submitButtonText: {
      color: 'white', 
    },
    iconColor: 'white'
  };
  customStyles = getStyles('Picker');

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
    <MultiSelectionListTouchableItem 
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
              <Text style={{...styles.fieldValue, flexWrap:'wrap'}}>{names.toString()}</Text>
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
          onRequestClose={this.onClose}>
          <TouchableOpacity 
          onPress={this.onClose} 
          style={{...styles.background, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{...styles.list, borderRadius: 15, maxHeight:'70%', width: '90%'}}>
              <FlatList 
                style={{margin: 20}}
                data={items}
                renderItem={this.renderListItem}
                keyExtractor={(item, index) => index.toString()}/>
              <TouchableHighlight 
                onPress={this.onChangeSelectionPress} 
                style={{...styles.submitButton, borderBottomRightRadius: 15, borderBottomLeftRadius: 15, height:45, width:'100%', justifyContent:'center'}}>
                <Text style={{...styles.submitButtonText, fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>ВЫБРАТЬ</Text>
              </TouchableHighlight>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}