import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import {setActiveTask} from '../../../../redux/tasks/taskActions'
import { connect } from 'react-redux';
import {LIGHT_AQUA_GREEN_COLOR} from '../../../../../res/style';
import getStyles from '../../../../../res/styles';

class TaskItem extends React.PureComponent {
  static propTypes = {
    task: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
    remove: PropTypes.func.isRequired,
  };

  defaultStyles = {
    row: {
      marginVertical: 7, 
      marginHorizontal: 15, 
      backgroundColor: 'rgba(17,49,85,0.55)', 
      borderRadius: 15,
      padding: 15
    },
    icon: {
      backgroundColor: LIGHT_AQUA_GREEN_COLOR
    },
    iconText: {
      color: 'white'
    },
    name: {
      color: 'white', 
      fontSize: 16, 
      fontWeight: 'bold'
    },
    author: {
      color: 'white', 
      fontSize: 14, 
      fontWeight: 'bold'
    },
    description: {
      color: 'white', 
      fontSize: 14
    }
  };
  customStyles = getStyles('TaskItem');

  goToDetailViewTask = () => {
    this.props.setActiveTask(this.props.task);
    this.props.navigation.navigate('ViewTask');
  };

  render() {
    let styles = this.customStyles !== undefined ? this.customStyles : this.defaultStyles;
    return (
      <View>
        <TouchableOpacity onPress={this.goToDetailViewTask} style={styles.row}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{justifyContent: 'center', flex: 0, marginRight: 15}}>
              <View style={{...styles.icon, width: 30, height:30, borderRadius:15, justifyContent: 'center',}}>
                <Text style={{...styles.iconText, fontSize: 16, textAlign: 'center', fontWeight: 'bold'}}>{this.props.task.authorName.charAt(0)}</Text>
              </View>
            </View>
            <View style={{flex: 1}}>
              <View>
                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.name}>{this.props.task.name}</Text>
              </View>
              <View>
                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.author}>{this.props.task.authorName}</Text>
              </View>
              <View>
                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.description}>{this.props.task.description}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveTask: (task) => dispatch(setActiveTask(task))
  };
}

export default connect(null, mapDispatchToProps)(TaskItem);
