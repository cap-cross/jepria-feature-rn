import React from 'react';
import { Text,  View, TextInput, StyleSheet} from 'react-native';


export default TextAreaField = ({input, meta: {touched, error, warning}, label, color, fontSize }) => {    

  const defaultColor = 'white';
  const defaultFontSize = 14;

  const styles = StyleSheet.create({
    card: {
      marginVertical: 7
    },
    fieldCaption: {
      margin: 7,
      color: color ? color : defaultColor, 
      fontSize: fontSize ? fontSize - 2 : defaultFontSize,  
      opacity: 0.75
    },
    valueContainer: {
      paddingHorizontal: 15, 
      paddingBottom: 7, 
      borderBottomColor: color ? color : defaultColor,  
      borderBottomWidth:1
    },
    valueContainerError: {
      paddingHorizontal: 15, 
      paddingBottom: 7, 
      borderBottomColor: 'red', 
      borderBottomWidth:1
    },
    fieldValue: {
      color: color ? color : defaultColor,  
      fontSize:  fontSize ? fontSize : defaultFontSize,
      borderColor: 'transparent'
    },
    notificationTextWarn: {
      color: 'yellow',  
      fontSize: fontSize ? fontSize - 2 : defaultFontSize,  
      opacity: 0.75,
    },
    notificationTextError: {
      color: 'red', 
      fontSize: fontSize ? fontSize - 2 : defaultFontSize,  
    }
  });

  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.fieldCaption}>{label}</Text>
      </View>
      <View style={ (touched && error !== undefined) ? styles.valueContainerError : styles.valueContainer}>
        <TextInput
          multiline={true}
          style={styles.fieldValue}
          onChangeText={input.onChange}
          onBlur={input.onBlur}
          onFocus={input.onFocus}
          value={input.value}
          style={styles.fieldValue}
          underlineColorAndroid='transparent'/>
      </View>
      { touched && error != undefined && <Text style={styles.notificationTextError}>{error}</Text> }
      { touched && warning != undefined && <Text style={styles.notificationTextWarn}>{warning}</Text>}
    </View>
  );
}