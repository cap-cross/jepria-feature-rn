import React from 'react';
import PropTypes from 'prop-types';
import {View,Text} from 'react-native';
import getStyles from '../../../../res/styles'

export default class UserDetail extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
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

    const user = this.props.user;

    return (
      <View style={styles.form}>
        <View style={styles.card}>
          <View>
            <Text style={styles.fieldCaption}>Идентификатор</Text>
          </View>
          <View style={styles.valueContainer}>
            <Text style={styles.fieldValue}>{user.operatorId}</Text>
          </View>
        </View>
        <View style={styles.card}>
          <View>
            <Text style={styles.fieldCaption}>Имя пользователя</Text>
          </View>
          <View style={styles.valueContainer}>
            <Text style={styles.fieldValue}>{user.username}</Text>
          </View>
        </View>
      </View>
    );
  }
}
