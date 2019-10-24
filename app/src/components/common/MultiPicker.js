import React from 'react';
import getStyles from '../../../res/styles'
import {
  View,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  Text,
  Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const itemStyles = {
  item: {
    borderBottomColor: 'rgba(255,255,255,0.25)', 
  },
  itemText: {
    color: 'white', 
  },
  iconColor: 'white',
  ...getStyles('PickerItem')
};

function PickerItem({ item, selected, onSelect }) {
  return (
    <TouchableOpacity
      style={{...itemStyles.item, borderBottomWidth: 1, padding: 15, backgroundColor: 'transparent',}}
      underlayColor='f00'
      onPress={() => onSelect(item)}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{...itemStyles.itemText, textAlign: 'center', fontSize:14, flex: 1,}}>{item.name}</Text>
            {selected && <Icon name="check-box" size={20} color={itemStyles.iconColor} style={{paddingRight: 10}}/>}
            {!selected && <Icon name="check-box-outline-blank" size={20} color={itemStyles.iconColor} style={{paddingRight: 10}} />}
      </View>
    </TouchableOpacity>
  );
}

pickerStyles = {
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
  iconColor: 'white',
  ...getStyles('Picker')
};

function MultiPickerDialog({items, selectedItems, onConfirm}) {
  const [selected, setSelected] = React.useState(selectedItems.slice());

  onSelect = item => {
    if (selected.some(selectedItem => {return item.value === selectedItem.value})) {
      setSelected(selected.filter(selectedItem => {return item.value !== selectedItem.value}));
    } else {
      setSelected(selected.concat(item));
    }
  }

  return (
    <View style={{...pickerStyles.list, borderRadius: 15, maxHeight:'70%', width: '90%'}}>
      <FlatList
        style={{margin: 20}}
        data={items}
        renderItem={({ item }) => (
          <PickerItem
            item={item}
            selected={selected.some(selectedItem => {return item.value === selectedItem.value})}
            onSelect={onSelect}
          />
        )}
        keyExtractor={item => item.value.toString()}
        ListEmptyComponent = {() => {
          return(
            <TouchableOpacity
            style={{...itemStyles.item, borderBottomWidth: 1, padding: 15, backgroundColor: 'transparent',}}
            underlayColor='f00'
            onPress={() => onConfirm(selectedItems)}>
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{...itemStyles.itemText, textAlign: 'center', fontSize:14, flex: 1,}}>Пусто</Text>
              </View>
            </TouchableOpacity>
          )
        }}
      />
      <TouchableHighlight 
        onPress={() => onConfirm(selected)} 
        style={{...pickerStyles.submitButton, borderBottomRightRadius: 15, borderBottomLeftRadius: 15, height:45, width:'100%', justifyContent:'center'}}>
        <Text style={{...pickerStyles.submitButtonText, fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>ВЫБРАТЬ</Text>
      </TouchableHighlight>
    </View>
  );
}

export default function MultiPicker({labelText, input, items}) {
  const [visible, setVisible] = React.useState(false);

  const arrayToString = items => {
    let result = "";
    if (result === input.value) {
      return result;
    }
    items.forEach(function(item) {
      result += item.name + ", ";
    });
    return result.substring(0, result.length -2);
  }

  const onConfirm = item => {
    setVisible(false);
    input.onChange(item);
  }

  return (
    <View>
      <TouchableOpacity 
          style={{...pickerStyles.card, flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}
          onPress={() => setVisible(true)} >
        <View style={{flex: 1}}>
          <View>
            <Text style={pickerStyles.fieldCaption}>{labelText}</Text>
          </View>
          <View style={pickerStyles.valueContainer}>
            <Text style={{...pickerStyles.fieldValue, flexWrap:'wrap'}}>{arrayToString(input.value)}</Text>
          </View>
        </View>
        <View style={{justifyContent:'center', flex: 0}}>
          <Icon name='expand-more' color={pickerStyles.iconColor} size={30} />
        </View>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}>
        <TouchableOpacity 
          onPress={() => setVisible(false)} 
          style={{...pickerStyles.background, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <MultiPickerDialog 
            items = {items} 
            selectedItems = {input.value != "" ? input.value : [] }
            onConfirm = {onConfirm}/>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}