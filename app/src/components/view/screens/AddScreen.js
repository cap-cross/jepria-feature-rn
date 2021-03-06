import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableHighlight } from 'react-native';
import Toast from '../../common/Toast'
import connect from 'react-redux/lib/connect/connect';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';

import { reduxForm } from 'redux-form';

import withBackButton from '../../../components/common/hoc/withBackButton';

import {setActiveFeature} from '../../../redux/feature/featureActions';
import { createFeature, findFeature } from '../../../redux/feature/featureMiddleware';
import AddForm from '../form/AddForm';
import Background from '../../../components/common/Background';
import {DARK_BLUE_COLOR, DARK_AQUA_GREEN_COLOR} from '../../../../res/style';
import { LoadingPanel } from '../../common/LoadingPanel';
import getStyles from '../../../../res/styles'

const mapDispatchToProps = dispatch => ({
  createFeature: (values) => {return dispatch(createFeature(values))},
  setActiveFeature: (feature) => dispatch(setActiveFeature(feature)),
  findFeature: (searchTemplate) => dispatch(findFeature(searchTemplate))
});

const mapStateToProps = (state) => {
  return {
    searchTemplate: state.feature.searchTemplate,
    isLoading: state.feature.isCreating,
  }
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: 'addForm' }),
  withBackButton(),
  pure,
);

@enhance
export default class AddScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

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

  handleSubmit = () => this.props.handleSubmit(this.submitAddForm);

  submitAddForm = (values) => {
    this.props.createFeature({
      featureName: values.featureName,
      featureNameEn: values.featureNameEn,
      description: values.description,
    })
    .then((feature) => {
      this.props.setActiveFeature(feature);
      this.props.findFeature(this.props.searchTemplate);
      this.props.navigation.navigate('ViewFeature');
    })
    .catch((err) => {
      Toast.show("", err.message, true);
    });
  };

  render() {
    let styles = this.customStyles !== undefined ? this.customStyles : this.defaultStyles;

    return (
      <Background>
        <KeyboardAwareScrollView enableOnAndroid>
          <AddForm/>
        </KeyboardAwareScrollView>
        <View>
          <TouchableHighlight
            style={styles.button}
            underlayColor={DARK_AQUA_GREEN_COLOR}
            onPress={this.handleSubmit()}>
            <Ionicons name="md-checkmark" size={32} style={styles.buttonIcon} />
          </TouchableHighlight>
        </View>
        <LoadingPanel show={this.props.isLoading} text="Создание записи"/>
      </Background>
    );
  }
}
