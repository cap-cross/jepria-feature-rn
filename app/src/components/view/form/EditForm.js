import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'native-base';
import { Field, reduxForm } from 'redux-form';
import {StyleSheet, View} from 'react-native';

import TextArea from '../../common/TextArea';
import TextInput from '../../common/TextInput';
import isUserHaveRoles from '../../../data/clientSecurity';
import {required, expected} from '../../../data/validation';
import { getStatuses } from '../../../redux/status/statusMiddleware';
import { getOperators } from '../../../redux/operator/operatorMiddleware';
import { connect } from 'react-redux';
import Picker from '../../common/Picker/Picker'
import getStyles from '../../../../res/styles'

class EditForm extends React.Component {

  componentDidMount() {
    if(this.props.statuses.length == 0) this.props.getStatuses();
    if(this.props.operators.length == 0) this.props.getOperators();
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
    console.log('EditForm!.render() BEGIN');
    console.log(`EditForm!: task = ${JSON.stringify(this.props.initialValues)}`);
    let styles = this.customStyles !== undefined ? this.customStyles : this.defaultStyles;
    let isJrsAssignResponsibleFeatureRole = this.props.userRoles.length > 0 ? isUserHaveRoles(["JrsAssignResponsibleFeature"], this.props.userRoles) : false;
    
    return (
        <View style={styles.form}>
          <Form>
            <Field 
              name="name"
              component={TextInput}
              labelText="Название"
              validate = {required}
            />
            <Field
              name="nameEn"
              component={TextInput}
              labelText="Название (англ)"
              validate = {required}
            />
            <Field
              name="description"
              component={TextArea}
              labelText="Описание" 
              warn = {expected}
            />
            <Field
              name="statusCode"
              component={Picker}
              labelText="Статус"
              itemNameKey='statusName'
              itemValueKey='statusCode'
              items={this.props.statuses}
            />
            { isJrsAssignResponsibleFeatureRole && //проверка наличия роли
              <Field
                name="responsible"
                component={Picker}
                labelText="Ответственный"
                itemNameKey='operatorName'
                itemValueKey='operatorCode'
                hasEmptyItem={true}
                items={this.props.operators}
              />
            }
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

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);//(reduxForm({form: "EditForm"})(EditForm));