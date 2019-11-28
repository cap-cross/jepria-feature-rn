import React from 'react';
import { Field } from 'redux-form';
import { View } from 'react-native';

import TextArea from '../../common/TextArea';
import TextInput from '../../common/TextInput';
import isUserHaveRoles from '../../../data/clientSecurity';
import { required, expected } from '../../../data/validation';
import Picker from '../../common/Picker'
import getStyles from '../../../../res/styles'

const styles = {
  form: {
    margin: 15, 
    padding: 15, 
    backgroundColor: 'rgba(17,49,85,0.55)', 
    borderRadius:30
  },
  ...getStyles('Form')
}

export default EditForm = (userRoles, statuses, operators) => {
    let isJrsAssignResponsibleFeatureRole = isUserHaveRoles(["JrsAssignResponsibleFeature"], userRoles);
    
    return (
      <View style={styles.form}>
        <Field 
          name="featureName"
          component={TextInput}
          label="Название"
          validate = {required}/>
        <Field
          name="featureNameEn"
          component={TextInput}
          label="Название (англ)"
          validate = {required}/>
        <Field
          name="description"
          component={TextArea}
          label="Описание" 
          warn = {expected}/>
        <Field
          name="featureStatus"
          component={Picker}
          labelText="Статус"
          itemNameKey='name'
          itemValueKey='value'
          items={statuses}/>
      { isJrsAssignResponsibleFeatureRole && //проверка наличия роли
        <Field
          name="responsibleId"
          component={Picker}
          labelText="Ответственный"
          itemNameKey='name'
          itemValueKey='value'
          hasEmptyItem={true}
          items={operators}/>
      }
    </View>
  );
}