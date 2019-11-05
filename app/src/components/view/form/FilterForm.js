import React from 'react';
import {
  View,
} from 'react-native';
import { Field } from 'redux-form';

import TextInput from '../../common/TextInput';
import MultiPicker from '../../common/MultiPicker';

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

export default FilterForm = ({operators, statuses}) => {

  return (
    <View style={styles.form}>
      <Field
        style={styles.formfields}
        name="featureId"
        component={TextInput}
        labelText="Идентификатор"
      />
      <Field
        style={styles.formfields}
        name="statusCodeList"
        component={MultiPicker}
        labelText="Статус"
        items={statuses}
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
        items={operators}
      />
      <Field
        style={styles.formfields}
        name="responsibleId"
        component={Picker}
        labelText="Ответственный"
        items={operators}
      />
    </View>
  );
}
