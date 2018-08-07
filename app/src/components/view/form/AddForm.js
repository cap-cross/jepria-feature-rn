import React from 'react';
import { Form } from 'native-base';
import { Field } from 'redux-form';
import {required, expected} from '../../../data/validation';
import {
  StyleSheet,
  View,
} from 'react-native';

import TextInput from '../../common/TextInput';
import TextArea from '../../common/TextArea';
import log from '@cap-cross/cap-core';

export default class AddForm extends React.Component {

  render() {
    log.trace('AddForm.render()');
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
        </Form>
      </View>
    );
  }
}
