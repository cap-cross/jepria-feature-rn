import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import {setActiveFeature} from '../../../../redux/feature/featureActions'
import { connect } from 'react-redux';
import {LIGHT_AQUA_GREEN_COLOR} from '../../../../../res/style';
import getStyles from '../../../../../res/styles';

class FeatureItem extends React.PureComponent {
  static propTypes = {
    item: PropTypes.object.isRequired,
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

  goToDetailView = () => {
    this.props.setActiveFeature(this.props.item);
    this.props.navigation.navigate('ViewFeature');
  };

  render() {
    let styles = this.customStyles !== undefined ? this.customStyles : this.defaultStyles;
    return (
      <View>
        <TouchableOpacity onPress={this.goToDetailView} style={styles.row}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{justifyContent: 'center', flex: 0, marginRight: 15}}>
              <View style={{...styles.icon, width: 30, height:30, borderRadius:15, justifyContent: 'center',}}>
                <Text style={{...styles.iconText, fontSize: 16, textAlign: 'center', fontWeight: 'bold'}}>{this.props.item.author.name.charAt(0)}</Text>
              </View>
            </View>
            <View style={{flex: 1}}>
              <View>
                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.name}>{this.props.item.featureName}</Text>
              </View>
              <View>
                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.author}>{this.props.item.author.value}</Text>
              </View>
              <View>
                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.description}>{this.props.item.description}</Text>
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
    setActiveFeature: (task) => dispatch(setActiveFeature(task))
  };
}

export default connect(null, mapDispatchToProps)(FeatureItem);
