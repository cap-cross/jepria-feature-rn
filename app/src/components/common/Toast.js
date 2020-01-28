import { Platform, ToastAndroid, Alert} from 'react-native';

class Toast {
  static show = (title, message, isError) => {
    if (Platform.OS === 'ios') {
      Alert.alert(title, message);
    } else {
      let duration;
      if (isError) {
        duration = ToastAndroid.LONG;
      } else {
        duration = ToastAndroid.SHORT;
      }
      ToastAndroid.showWithGravity(message, duration, ToastAndroid.BOTTOM);
    }
  }
}

export default Toast;