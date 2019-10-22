import React from 'react';
import {
  View,
} from 'react-native';
import { Form } from 'native-base';
import { Field } from 'redux-form';

import TextInput from '../../common/TextInput';
import { getFeatureStatuses } from '../../../redux/status/statusMiddleware';
import { getFeatureOperators } from '../../../redux/operator/operatorMiddleware';
import List from '../../common/MuliselectionList/MultiselectionList';
import { connect } from 'react-redux';
import Picker from '../../common/Picker/Picker'
import getStyles from '../../../../res/styles'

const mapStateToProps = (state) => {
  return {
    userRoles: state.user.userRoles,
    operators: state.operators,
    statuses: state.statuses,
    isLoading: state.isLoading,
    isFailed: state.isFailed,
    errorMessage: state.errorMessage,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFeatureStatuses: () => dispatch(getFeatureStatuses()),
    getFeatureOperators: () => dispatch(getFeatureOperators())
  };
}

class FilterForm extends React.Component {
  componentDidMount() {
    if(this.props.statuses.length == 0) this.props.getFeatureStatuses();
    if(this.props.operators.length == 0) this.props.getFeatureOperators();
  }

  defaultStyles = {
    form: {
      margin: 15, 
      padding: 15, 
      backgroundColor: 'rgba(17,49,85,0.55)', 
      borderRadius:30
    },
  }
  customStyles = getStyles('Form');

  render() {
    let styles = this.customStyles !== undefined ? this.customStyles : this.defaultStyles;
    return (
      <View style={styles.form}>
        <Form>
          <Field
            style={styles.formfields}
            name="featureId"
            component={TextInput}
            labelText="Идентификатор"
          />
          <Field
            style={styles.formfields}
            name="statusCodeList"
            component={List}
            labelText="Статус"
            items={this.props.statuses}
          />
          <Field
            style={styles.formfields}
            name="featureNameTemplate"
            component={TextInput}
            labelText="Название"
          />
          <Field
            style={styles.formfields}
            name="featureNameEnTemplate"
            component={TextInput}
            labelText="Название (англ)"
          />
          <Field
            style={styles.formfields}
            name="authorId"
            component={Picker}
            labelText="Автор"
            itemNameKey='name'
            itemValueKey='value'
            hasEmptyItem={true}
            items={this.props.operators}
          />
          <Field
            style={styles.formfields}
            name="responsibleId"
            component={Picker}
            labelText="Ответственный"
            itemNameKey='name'
            itemValueKey='value'
            hasEmptyItem={true}
            items={this.props.operators}
          />
        </Form>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterForm);
