import {LIGHT_AQUA_GREEN_COLOR} from './style';

const styles = {
  LoginTextInput: {
    container: {
      marginVertical: 7,
      backgroundColor: 'rgba(17,49,85,0.55)', 
      borderRadius: 30, 
      height: 60, 
      marginHorizontal: 30, 
      paddingHorizontal: '10%', 
      paddingVertical: 5
    },
    error: {
      borderColor: 'red', 
      borderWidth: 1,
    },
    icon: {
      color: 'red', 
      fontSize: 30,
    },
    inputTextColor: {
      color: 'white'
    },
    placeholderTextColor: 'rgba(255,255,255,0.55)'
  },
  
  MultiSelectionListTouchableItem: {
    item: {
      borderBottomColor: 'rgba(255,255,255,0.25)', 
    },
    itemText: {
      color: 'white', 
    },
    iconColor: 'white'
  },

  MultiSelectionList: {
    card: {
      marginVertical: 7,
      borderBottomColor: 'white', 
      borderBottomWidth:1
    },
    fieldCaption: {
      margin: 7,
      color: 'white', 
      fontSize: 12, 
      opacity: 0.75
    },
    valueContainer: {
      paddingHorizontal: 15, 
      paddingVertical: 7,
    },
    fieldValue: {
      color: 'white', 
      fontSize: 14,
      minHeight: 20
    },
    background: {
      backgroundColor: 'rgba(52,52,52,0.8)',
    },
    list: {
      backgroundColor: 'rgba(51,63,75,0.9)',
    },
    submitButton: {
      backgroundColor: '#7D92A5',
    },
    submitButtonText: {
      color: 'white', 
    },
    iconColor: 'white'
  },
  Picker: {
    card: {
      marginVertical: 7,
      borderBottomColor: 'white', 
      borderBottomWidth:1
    },
    fieldCaption: {
      margin: 7,
      color: 'white', 
      fontSize: 12, 
      opacity: 0.75
    },
    valueContainer: {
      paddingHorizontal: 15, 
      paddingVertical: 7,
    },
    fieldValue: {
      color: 'white', 
      fontSize: 14,
      minHeight: 20
    },
    background: {
      backgroundColor: 'rgba(52,52,52,0.8)',
    },
    list: {
      backgroundColor: 'rgba(51,63,75,0.9)',
    },
    iconColor: 'white'
  },
  PickerTouchableItem: {
    item: {
      borderBottomColor: 'rgba(255,255,255,0.25)', 
    },
    itemText: {
      color: 'white', 
    },
    iconColor: 'white'
  },
  TextInput: {    
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
      borderBottomWidth:1
    },
    valueContainerError: {
      paddingHorizontal: 15, 
      paddingBottom: 7, 
      borderBottomColor: 'red', 
      borderBottomWidth:1
    },
    fieldValue: {
      color: 'white', 
      fontSize: 14,
      borderColor: 'transparent'
    },
    notificationTextWarn: {
      color: 'white', 
      fontSize: 12, 
      opacity: 0.75,
    },
    notificationTextError: {
      color: 'red', 
      fontSize: 12,
    }
  },
  TaskItem: {
    row: {
      marginVertical: 7, 
      marginHorizontal: 15, 
      backgroundColor: 'rgba(17,49,85,0.55)', 
      borderRadius: 15,
      padding: 15
    },
    icon: {
      backgroundColor: LIGHT_AQUA_GREEN_COLOR
    },
    iconText: {
      color: 'white'
    },
    name: {
      color: 'white', 
      fontSize: 16, 
      fontWeight: 'bold'
    },
    author: {
      color: 'white', 
      fontSize: 14, 
      fontWeight: 'bold'
    },
    description: {
      color: 'white', 
      fontSize: 14
    }
  },
  Form: {
    form: {
      margin: 15, 
      padding: 15, 
      backgroundColor: 'rgba(17,49,85,0.55)', 
      borderRadius:30
    },
  },
  HistoryListItem: {
    card: {
      backgroundColor: 'rgba(17,49,85,0.55)',
      borderRadius: 15,
      padding: 15,
      marginVertical: 7, 
      marginHorizontal: 15,
    },
    text: {
      color: 'white',
      marginLeft: 8,
    },
  },
  LoginForm: {
    buttonText: {
      color: 'white',
      fontSize: 30,
      textAlign: 'center',
      alignSelf: 'stretch',
    },
    text: {
      color: 'black',
      fontSize: 22,
    },
    footer: {
      backgroundColor: 'rgba(17,49,85,0.85)'
    },
    footerText: {
      color: 'white', 
    },
  },
  ViewForm: {
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
      fontSize: 14,
      minHeight: 20,
    },
  }
}

export default getStyles = (styleName) => {
  return styles[styleName];
}