import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Form } from 'native-base';
import { Field } from 'redux-form';

import TextInput from '../../common/TextInput';
import { getStatuses } from '../../../redux/status/statusMiddleware';
import { getOperators } from '../../../redux/operator/operatorMiddleware';
import List from '../../common/MuliselectionList/MultiselectionList';
import { connect } from 'react-redux';
import Picker from '../../common/Picker/Picker'

class FilterForm extends React.Component {
  componentDidMount() {
    if(this.props.statuses.length == 0) this.props.getStatuses();
    if(this.props.operators.length == 0) this.props.getOperators();
  }

  render() {
    const styles = StyleSheet.create({
      form: {
        margin: 15, 
        padding: 15, 
        backgroundColor: 'rgba(17,49,85,0.55)', 
        borderRadius:30
      },
    });

    return (
      <View style={styles.form}>
        <Form>
          <Field
            style={styles.formfields}
            name="id"
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
            name="name"
            component={TextInput}
            labelText="Название"
          />
          <Field
            style={styles.formfields}
            name="nameEn"
            component={TextInput}
            labelText="Название (англ)"
          />
          <Field
            style={styles.formfields}
            name="authorId"
            component={Picker}
            labelText="Автор"
            itemNameKey='operatorName'
            itemValueKey='operatorCode'
            hasEmptyItem={true}
            items={this.props.operators}
          />
          <Field
            style={styles.formfields}
            name="responsibleId"
            component={Picker}
            labelText="Ответственный"
            itemNameKey='operatorName'
            itemValueKey='operatorCode'
            hasEmptyItem={true}
            items={this.props.operators}
          />
        </Form>
      </View>
    );
  }
}

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
    getStatuses: () => dispatch(getStatuses()),
    getOperators: () => dispatch(getOperators())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterForm);
