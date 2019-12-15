import React from 'react';
import { Icon } from 'native-base';
import {TouchableOpacity, Text, View} from 'react-native';
import getStyles from '../../../../res/styles'

const styles = {
  form: {
    margin: 15, 
    padding: 15, 
    backgroundColor: 'rgba(17,49,85,0.55)', 
    borderRadius:30
  },
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
  fieldValue: {
    color: 'white', 
    fontSize: 14,
    minHeight: 20,
  },
  ...getStyles('ViewForm')
};

export default ViewDetail = ({feature, navigation}) => {
  return (
    <View style={styles.form}>
      <View style={styles.card}>
        <View>
          <Text style={styles.fieldCaption}>Идентификатор</Text>
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.fieldValue} selectable={true}>{feature.featureId}</Text>
        </View>
      </View>
      <View style={styles.card}>
        <TouchableOpacity 
          style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomColor: 'white', borderBottomWidth:1}} 
          onPress={() => navigation.navigate("TaskHistory")}>
          <View>
            <View>
              <Text style={styles.fieldCaption}>Статус</Text>
            </View>
            <View style={{paddingHorizontal: 15, paddingBottom: 7, }}>
              <Text style={styles.fieldValue}>{feature.featureStatus.name}</Text>
            </View>
          </View>
          <View>
            <Icon type='FontAwesome' name='chevron-right' style={{color: 'white', fontSize: 20}}/>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <View>
          <Text style={styles.fieldCaption} >Название</Text>
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.fieldValue} selectable={true}>{feature.featureName}</Text>
        </View>
      </View>
      <View style={styles.card}>
        <View>
          <Text style={styles.fieldCaption} >Название (англ)</Text>
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.fieldValue} selectable={true}>{feature.featureNameEn}</Text>
        </View>
      </View>
      <View style={styles.card}>
        <View>
          <Text style={styles.fieldCaption}>Описание</Text>
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.fieldValue} selectable={true}>{feature.description}</Text>
        </View>
      </View>
      <View style={styles.card}>
        <View>
          <Text style={styles.fieldCaption}>Автор</Text>
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.fieldValue} selectable={true}>{feature.author.name}</Text>
        </View>
      </View>
      <View style={styles.card}>
        <View>
          <Text style={styles.fieldCaption}>Ответственный</Text>
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.fieldValue} selectable={true}>{feature.responsible.name}</Text>
        </View>
      </View>
    </View>
  );
}
