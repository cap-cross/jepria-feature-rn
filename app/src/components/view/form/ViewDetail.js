import React from 'react';
import PropTypes from 'prop-types';
import {Content, Container, Icon } from 'native-base';
import {TouchableOpacity, Text, View} from 'react-native';
import getStyles from '../../../../res/styles'

export default class ViewDetail extends React.Component {
  static propTypes = {
    task: PropTypes.object.isRequired,
  };

  defaultStyles = {
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
  };
  customStyles = getStyles('ViewForm');

  render() {
    let styles = this.customStyles !== undefined ? this.customStyles : this.defaultStyles;

    const task = this.props.task;

    return (
          <View style={styles.form}>
            <View style={styles.card}>
              <View>
                <Text style={styles.fieldCaption}>Идентификатор</Text>
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.fieldValue} selectable={true}>{task.id}</Text>
              </View>
            </View>
            <View style={styles.card}>
              <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1, alignItems: 'center', borderBottomColor: 'white', borderBottomWidth:1}} onPress={() => this.props.navigation.navigate("TaskHistory")}>
                <View>
                  <View>
                    <Text style={styles.fieldCaption}>Статус</Text>
                  </View>
                  <View style={{paddingHorizontal: 15, paddingBottom: 7, }}>
                    <Text style={styles.fieldValue}>{task.statusName}</Text>
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
                <Text style={styles.fieldValue} selectable={true}>{task.name}</Text>
              </View>
            </View>
            <View style={styles.card}>
              <View>
                <Text style={styles.fieldCaption} >Название (англ)</Text>
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.fieldValue} selectable={true}>{task.nameEn}</Text>
              </View>
            </View>
            <View style={styles.card}>
              <View>
                <Text style={styles.fieldCaption}>Описание</Text>
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.fieldValue} selectable={true}>{task.description}</Text>
              </View>
            </View>
            <View style={styles.card}>
              <View>
                <Text style={styles.fieldCaption}>Автор</Text>
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.fieldValue} selectable={true}>{task.authorName}</Text>
              </View>
            </View>
            <View style={styles.card}>
              <View>
                <Text style={styles.fieldCaption}>Ответственный</Text>
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.fieldValue} selectable={true}>{task.responsibleName}</Text>
              </View>
            </View>
          </View>
    );
  }
}
