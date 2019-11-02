import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default ListView = ({items, renderItem, refreshing, onRefresh, errorMessage}) => {

  if (errorMessage) {
    return (
      <View style={{
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',}}>
        <MaterialIcons name="error" size={60} color="red" />
        <Text style={{textAlign: 'center', color: 'red'}}>{errorMessage}</Text>
      </View>
    );
  } 

  if (items.length == 0 && !refreshing) {
    return (
      <View style={{
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',}}>
        <MaterialIcons name="assignment" size={60} color="#E91E63" />
        <Text style={{color: 'white'}}>Данные отсутствуют</Text>
      </View>
    );
  }

  if (items.length > 0 || refreshing) {
    return (
      <View style={{flex: 1}}>
        <FlatList
          refreshing={refreshing}
          onRefresh={() => onRefresh()}
          data={items}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}/>
      </View>
    );
  }
}