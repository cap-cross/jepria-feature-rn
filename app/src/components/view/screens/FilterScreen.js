import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import connect from 'react-redux/lib/connect/connect';
import compose from 'recompose/compose';
import pure from 'recompose/pure';

import { reduxForm } from 'redux-form';
import withBackButton from '../../common/hoc/withBackButton';
import { findFeature } from '../../../redux/feature/featureMiddleware';
import { getFeatureStatuses } from '../../../redux/status/statusMiddleware';
import { getFeatureOperators } from '../../../redux/operator/operatorMiddleware';
import FilterForm from '../form/FilterForm';
import Background from '../../common/Background';
import {DARK_BLUE_COLOR, DARK_AQUA_GREEN_COLOR} from '../../../../res/style';
import getStyles from '../../../../res/styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const mapStateToProps = (state) => {
  return {
    searchTemplate: state.feature.searchTemplate,
    operators: state.operators,
    statuses: state.statuses,
    isLoading: state.isLoading,
    isFailed: state.isFailed,
    errorMessage: state.errorMessage,
    initialValues: {
      ...state.feature.searchTemplate,
      statusCodeList: state.feature.searchTemplate.statusCodeList ? state.feature.searchTemplate.statusCodeList.slice() : []
    }
}};

const mapDispatchToProps = (dispatch) => {
  return {
    findFeature: (searchTemplate) => dispatch(findFeature(searchTemplate)),
    getFeatureStatuses: () => dispatch(getFeatureStatuses()),
    getFeatureOperators: () => dispatch(getFeatureOperators())
  };
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'filterForm',
  }),
  withBackButton(),
  pure,
);

@enhance
export default class FilterScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if(this.props.statuses.length == 0) this.props.getFeatureStatuses();
    if(this.props.operators.length == 0) this.props.getFeatureOperators();
  }

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
  
  handleSubmit = () => this.props.handleSubmit(this.submitTask);

  submitTask = (values) => {
    this.props.findFeature(values);
    this.props.navigation.goBack();
  };

  goBack = () => {
    this.props.navigation.goBack();
  }

  render() {
    let styles = this.customStyles !== undefined ? this.customStyles : this.defaultStyles;
    return (
      <Background>
        <KeyboardAwareScrollView enableOnAndroid>
          <FilterForm
            statuses={this.props.statuses}
            operators={this.props.operators}/>
        </KeyboardAwareScrollView>
        <TouchableHighlight
          style={styles.button}
          underlayColor="red"
          onPress={this.handleSubmit()}>
          <Ionicons name="md-search" size={32} style={styles.buttonIcon} />
        </TouchableHighlight>
      </Background>
    );
  }
}
