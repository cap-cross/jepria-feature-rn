import React from 'react';
import { Form } from 'native-base';
import { Field } from 'redux-form';
import {required, expected} from '../../../data/validation';
import {
  View,
} from 'react-native';

import TextInput from '../../common/TextInput';
import TextArea from '../../common/TextArea';
import getStyles from '../../../../res/styles'

export default class AddForm extends React.Component {

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
        </Form>
      </View>
    );
  }
}
