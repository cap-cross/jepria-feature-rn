import React from 'react';
import {View, Text, TouchableOpacity, TouchableHighlight} from 'react-native'
import { connect } from 'react-redux';
import { compose, hoistStatics, pure} from 'recompose';

import {setActiveFeature} from '../../../redux/feature/featureActions'
import { findFeature, deleteFeature } from '../../../redux/feature/featureMiddleware';
import withBackButton from '../../common/hoc/withBackButton';
import Background from '../../common/Background';
import {DARK_BLUE_COLOR, DARK_AQUA_GREEN_COLOR, LIGHT_AQUA_GREEN_COLOR} from '../../../../res/style';
import getStyles from '../../../../res/styles'
import { Ionicons } from '@expo/vector-icons';

screenStyles = {
  header: {
    backgroundColor: DARK_BLUE_COLOR,
  },
  title: {
    color: '#FFFFFF',
    width: 150,
    fontSize: 20,
  },
  icon: {
    color: '#FFFFFF',
    fontSize: 30,
  },   
  button: {
    backgroundColor: DARK_AQUA_GREEN_COLOR,
    height: 56,
    width: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 30,
    right: 30,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  buttonIcon: {
    color: 'white',
  },
  ...getStyles('ListScreen'),
};

itemStyles = {
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
  },
  ...getStyles('TaskItem')
}

class ListScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: () => (
        <TouchableOpacity style={{margin: 20}} onPress={() => {navigation.openDrawer()}} transparent>
          <Ionicons name="md-menu" style={screenStyles.icon} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity style={{margin: 20}} onPress={() => {navigation.navigate('FilterFeature')}} transparent>
          <Ionicons name="md-search" style={screenStyles.icon} />
        </TouchableOpacity>
      ),
    }
  };

  componentDidMount() {
    this.props.findFeature(this.props.searchTemplate);
  }

  AddFeature = () => {
    this.props.navigation.navigate('AddFeature');
  };

  goToDetailView = (item) => {
    this.props.setActiveFeature(item);
    this.props.navigation.navigate('ViewFeature', {title: item.featureName});
  };

  render() {
    return (
      <Background>
        <ListView
          items={this.props.items}
          refreshing={this.props.isLoading}
          renderItem={
            ({item}) => {
              return (
                <View>
                  <TouchableOpacity onPress={() => this.goToDetailView(item)} style={itemStyles.row}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View style={{justifyContent: 'center', flex: 0, marginRight: 15}}>
                        <View style={{...itemStyles.icon, width: 30, height:30, borderRadius:15, justifyContent: 'center',}}>
                          <Text style={{...itemStyles.iconText, fontSize: 16, textAlign: 'center', fontWeight: 'bold'}}>{item.author.name.charAt(0)}</Text>
                        </View>
                      </View>
                      <View style={{flex: 1}}>
                        <View>
                          <Text numberOfLines={1} ellipsizeMode='tail' style={itemStyles.name}>{item.featureName}</Text>
                        </View>
                        <View>
                          <Text numberOfLines={1} ellipsizeMode='tail' style={itemStyles.author}>{item.author.name}</Text>
                        </View>
                        <View>
                          <Text numberOfLines={1} ellipsizeMode='tail' style={itemStyles.description}>{item.description}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }
          }
          onRefresh={() => this.props.findFeature(this.props.searchTemplate)}
          failed={this.props.isFailed}
          errorMessage={this.props.errorMessage}
        />
        <TouchableHighlight
          style={screenStyles.button}
          underlayColor="red"
          onPress={this.AddFeature}>
          <Ionicons name="md-add" size={32} style={screenStyles.buttonIcon} />
        </TouchableHighlight>
      </Background>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.feature.errorMessage,
    isFailed: state.feature.isFailed,
    isLoading: state.feature.isFetching,
    items: state.feature.items,
    searchTemplate: state.feature.searchTemplate,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    findFeature: (searchTemplate) => dispatch(findFeature(searchTemplate)),
    deleteFeature: (featureId) => dispatch(deleteFeature(featureId)),
    setActiveFeature: (feature) => dispatch(setActiveFeature(feature))
  };
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withBackButton(),
  pure,
);

export default hoistStatics(enhance)(ListScreen);
