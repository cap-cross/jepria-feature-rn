import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import { Content, Button, Icon, Toast } from 'native-base';
import connect from 'react-redux/lib/connect/connect';
import {compose, pure, hoistStatics} from 'recompose';

import ViewDetail from '../form/ViewDetail';
import withBackButton from '../../../components/common/hoc/withBackButton';
import {setActiveFeature} from '../../../redux/feature/featureActions';
import { deleteFeature, findFeature } from '../../../redux/feature/featureMiddleware';
import Background from '../../../components/common/Background';
import {DARK_BLUE_COLOR, DARK_AQUA_GREEN_COLOR} from '../../../../res/style';
import { LoadingPanel } from '../../common/LoadingPanel';
import getStyles from '../../../../res/styles'


const styles = {
  content: {
    justifyContent: 'space-between',
    padding: 8,
  },
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
        <Button  onPress={() => {handleDelete()}} transparent>
          <Icon name="trash" style={styles.icon} />
        </Button>
      ),
    }
  };

  componentDidMount() {
    this.props.navigation.setParams({
      handleDelete: this.removeFeature
    });
  }

  removeFeature = () => {
    this.props.deleteFeature({
          featureId: this.props.feature.featureId,
        }).catch(error => {
          console.log(error)
        })
      // .then(() => {
      //   //this.props.findFeature(this.props.searchTemplate);
      //   // Toast.show({
      //   //   text: "Запись успешно удалена",
      //   //   type: 'success',
      //   //   buttonText: 'OK',
      //   //   duration: 5000
      //   // });
      //   //this.props.navigation.goBack(null);
      // })
      // .catch((err) => {
      //   // Toast.show({
      //   //   text: err.message,
      //   //   type: 'danger',
      //   //   buttonText: 'OK',
      //   //   duration: 5000
      //   // });
      // });
  };

  goBack = () => this.props.navigation.goBack(null);

  goToUpdateFeature = () => {
    this.props.navigation.navigate('EditFeature', {
      title: this.props.feature.featureName
    });
  };

  render() {
    const feature = this.props.feature;
    return (
      <Background>
        <Content contentContainerStyle={styles.content}>
          <ViewDetail
            navigation={this.props.navigation}
            feature={feature}/>
        </Content>
        <View>
          <TouchableHighlight
            style={styles.button}
            underlayColor={DARK_AQUA_GREEN_COLOR}
            onPress={this.goToUpdateFeature}>
            <Icon name="md-create" style={styles.buttonIcon} />
          </TouchableHighlight>
        </View>
        <LoadingPanel show={this.props.isLoading} text="Удаление записи"/>
      </Background>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  deleteFeature: (values) => {dispatch(deleteFeature(values))},
  setActiveFeature: (feature) => dispatch(setActiveFeature(feature)),
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