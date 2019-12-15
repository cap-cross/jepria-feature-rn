import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableHighlight} from 'react-native';
import { Container, Content, Icon, Toast } from 'native-base';
import connect from 'react-redux/lib/connect/connect';
import {compose, pure, hoistStatics} from 'recompose';

import { reduxForm } from 'redux-form';

import withBackButton from '../../../components/common/hoc/withBackButton';
import EditForm from '../form/EditForm';
import {setActiveFeature} from '../../../redux/feature/featureActions';
import { updateFeature, findFeature } from '../../../redux/feature/featureMiddleware';
import { getFeatureStatuses } from '../../../redux/status/statusMiddleware';
import { getFeatureOperators } from '../../../redux/operator/operatorMiddleware';
import Background from '../../common/Background';
import {DARK_BLUE_COLOR, DARK_AQUA_GREEN_COLOR} from '../../../../res/style';
import { LoadingPanel } from '../../common/LoadingPanel';
import getStyles from '../../../../res/styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SecurityContext } from '../../../context/SecurityContext';

class EditScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title")
    }
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  static contextType = SecurityContext;

  defaultStyles = {
    content: {
      justifyContent: 'space-between',
      padding: 8,
    },
    header: {
      backgroundColor: DARK_BLUE_COLOR,
    },
    title: {
      color: '#FFFFFF',
      width: 200,
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
  };
  customStyles = getStyles('FormScreen');

  componentDidMount = () => {
    this.props.getFeatureStatuses();
    this.props.getFeatureOperators();
  }

  handleSubmit = () => this.props.handleSubmit(this.submitFeature);

  goBack = () => this.props.navigation.goBack();

  submitFeature = (values) => {
    this.props.updateFeature(this.props.initialValues.featureId, {
          featureName: values.featureName,
          featureNameEn: values.featureNameEn,
          description: values.description,
        }, values.featureStatus.value)
      .then((feature) => {
        this.props.setActiveFeature(feature);
        this.props.findFeature(this.props.searchTemplate);
        Toast.show({
          text: "Изменения успешно сохранены!",
          type: 'success',
          buttonText: 'OK',
          duration: 5000
        });
        this.props.navigation.navigate('ViewFeature');
      })
      .catch((err) => {
        Toast.show({
          text: err.message,
          type: 'danger',
          buttonText: 'OK',
          duration: 5000
        });
      });
  };

  render() {
    let styles = this.customStyles !== undefined ? this.customStyles : this.defaultStyles;

    return (
      <Background>
        <KeyboardAwareScrollView enableOnAndroid>
          <EditForm
          operators={this.props.operators}
          statuses={this.props.statuses}
          userRoles={this.context.user.roles}/>
        </KeyboardAwareScrollView>
        <TouchableHighlight
          style={styles.button}
          underlayColor="red"
          onPress={this.handleSubmit()}>
          <Icon name="md-checkmark" style={styles.buttonIcon} />
        </TouchableHighlight>
        <LoadingPanel show={this.props.isLoading} text="Обновление записи"/>
      </Background>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  updateFeature: (featureId, values, featureStatusCode) => {return dispatch(updateFeature(featureId, values, featureStatusCode))},
  setActiveFeature: (feature) => dispatch(setActiveFeature(feature)),
  findFeature: (searchTemplate) => dispatch(findFeature(searchTemplate)),
  getFeatureStatuses: () => dispatch(getFeatureStatuses()),
  getFeatureOperators: () => dispatch(getFeatureOperators())
});

const mapStateToProps = (state) => {
  return {
    initialValues: state.feature.activeItem,
    searchTemplate: state.feature.searchTemplate,
    isLoading: state.feature.isUpdating,
    operators: state.operators,
    statuses: state.statuses,
    isFailed: state.isFailed,
    errorMessage: state.errorMessage,
  }
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'editForm',
  }),
  withBackButton(),
  pure,
);

export default hoistStatics(enhance)(EditScreen);
