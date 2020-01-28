import React from 'react';
import { View, TouchableHighlight, ScrollView, TouchableOpacity } from 'react-native';
import Toast from '../../common/Toast'
import { Ionicons } from '@expo/vector-icons';
import connect from 'react-redux/lib/connect/connect';
import {compose, pure, hoistStatics} from 'recompose';

import ViewDetail from '../form/ViewDetail';
import withBackButton from '../../../components/common/hoc/withBackButton';
import { deleteFeature, findFeature } from '../../../redux/feature/featureMiddleware';
import Background from '../../../components/common/Background';
import {DARK_BLUE_COLOR, DARK_AQUA_GREEN_COLOR} from '../../../../res/style';
import { LoadingPanel } from '../../common/LoadingPanel';
import getStyles from '../../../../res/styles'


const styles = {
  inputGroup: {
    flex: 0.9,
  },
  header: {
    backgroundColor: DARK_BLUE_COLOR,
  },
  title: {
    color: '#FFFFFF',
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
  ...getStyles('FormScreen')
};

class DetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const handleDelete  = navigation.getParam("handleDelete");
    return {
      title: navigation.getParam("title"),
      headerRight: () => (
        <TouchableOpacity style={{margin: 20}} onPress={() => {handleDelete()}} transparent>
          <Ionicons name="md-trash" style={styles.icon} />
        </TouchableOpacity>
      ),
    }
  };

  componentDidMount() {
    this.props.navigation.setParams({
      handleDelete: this.removeFeature
    });
  }

  removeFeature = () => {
    this.props.deleteFeature(this.props.feature.featureId).then(() => {
      this.props.findFeature(this.props.searchTemplate);
      this.props.navigation.goBack();
    }).catch((err) => {
      Toast.show("", err.message, true);
    });
  };
  
  goToUpdateFeature = () => {
    this.props.navigation.navigate('EditFeature', {
      title: this.props.feature.featureName
    });
  };

  render() {
    const feature = this.props.feature;
    return (
      <Background>
        <ScrollView>
          <ViewDetail
            navigation={this.props.navigation}
            feature={feature}/>
        </ScrollView>
        <View>
          <TouchableHighlight
            style={styles.button}
            underlayColor={DARK_AQUA_GREEN_COLOR}
            onPress={this.goToUpdateFeature}>
            <Ionicons name="md-create" size={32} style={styles.buttonIcon} />
          </TouchableHighlight>
        </View>
        <LoadingPanel show={this.props.isLoading} text="Удаление записи"/>
      </Background>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  deleteFeature: (values) => {return dispatch(deleteFeature(values))},
  findFeature: (searchTemplate) => dispatch(findFeature(searchTemplate))
});

const mapStateToProps = (state) => {
  return {
    feature: state.feature.activeItem,
    searchTemplate: state.feature.searchTemplate,
    isLoading: state.feature.isDeleting,
  }
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withBackButton(),
  pure,
);

export default hoistStatics(enhance)(DetailScreen);