import React from 'react';
import { Form } from 'native-base';
import { Field} from 'redux-form';
import {View} from 'react-native';

import TextArea from '../../common/TextArea';
import TextInput from '../../common/TextInput';
import isUserHaveRoles from '../../../data/clientSecurity';
import {required, expected} from '../../../data/validation';
import { getFeatureStatuses } from '../../../redux/status/statusMiddleware';
import { getFeatureOperators } from '../../../redux/operator/operatorMiddleware';
import { connect } from 'react-redux';
import Picker from '../../common/Picker'
import getStyles from '../../../../res/styles'

class EditForm extends React.Component {

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
    let isJrsAssignResponsibleFeatureRole = this.props.userRoles.length > 0 ? isUserHaveRoles(["JrsAssignResponsibleFeature"], this.props.userRoles) : false;
    
    return (
        <View style={styles.form}>
          <Form>
            <Field 
              name="featureName"
              component={TextInput}
              labelText="Название"
              validate = {required}
            />
            <Field
              name="featureNameEn"
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
              name="featureStatus"
              component={Picker}
              labelText="Статус"
              itemNameKey='name'
              itemValueKey='value'
              items={this.props.statuses}
            />
            { isJrsAssignResponsibleFeatureRole && //проверка наличия роли
              <Field
                name="responsibleId"
                component={Picker}
                labelText="Ответственный"
                itemNameKey='name'
                itemValueKey='value'
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
    getFeatureStatuses: () => dispatch(getFeatureStatuses()),
    getFeatureOperators: () => dispatch(getFeatureOperators())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);