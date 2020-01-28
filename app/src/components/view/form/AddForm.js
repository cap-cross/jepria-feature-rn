import React from 'react';
import { Field } from 'redux-form';
import {required, expected} from '../../../data/validation';
import {
  View,
} from 'react-native';

import TextInput from '../../common/TextInput';
import TextArea from '../../common/TextArea';
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

export default AddForm = () => {

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
    </View>
  );
}
