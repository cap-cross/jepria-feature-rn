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
import log from '@cap-cross/cap-core';
import Picker from '../../common/Picker/Picker'

class EditForm extends React.Component {

  componentDidMount() {
    if(this.props.statuses.length == 0) this.props.getStatuses();
    if(this.props.operators.length == 0) this.props.getOperators();
  }
  
  //handleSubmit = () => this.props.handleSubmit(this.submitTask);

  render() {
    log.trace('EditForm!.render() BEGIN');
    log.trace(`EditForm!: task = ${JSON.stringify(this.props.initialValues)}`);

    const styles = StyleSheet.create({
      form: {
        margin: 15, 
        padding: 15, 
        backgroundColor: 'rgba(17,49,85,0.55)', 
        borderRadius:30
      },
      card: {
        marginVertical: 7
      },
      fieldCaption: {
        margin: 7,
        color: 'white', 
        fontSize: 12, 
        opacity: 0.75
      },
      valueContainer: {
        paddingHorizontal: 15, 
        paddingBottom: 7, 
        borderBottomColor: 'white', 
        borderBottomWidth:2
      },
      fieldValue: {
        color: 'white', 
        fontSize: 14
      },
    });
    let isJrsAssignResponsibleFeatureRole = this.props.userRoles.length > 0 ? isUserHaveRoles(["JrsAssignResponsibleFeature"], this.props.userRoles) : false;
    
    return (
        <View style={styles.form}>
          <Form>
            <Field 
              style={styles.formfields}
              name="name"
              component={TextInput}
              labelText="Название"
              validate = {required}
            />
            <Field
              style={styles.formfields}
              name="nameEn"
              component={TextInput}
              labelText="Название (англ)"
              validate = {required}
            />
            <Field
              style={styles.formfields}
              name="description"
              component={TextArea}
              labelText="Описание" 
              warn = {expected}
            />
            <Field
              style={styles.formfields}
              name="statusCode"
              component={Picker}
              labelText="Статус"
              itemNameKey='statusName'
              itemValueKey='statusCode'
              items={this.props.statuses}
            />
            { isJrsAssignResponsibleFeatureRole && //проверка наличия роли
              <Field
                style={styles.formfields}
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