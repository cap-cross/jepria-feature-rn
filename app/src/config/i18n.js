import { NativeModules, Platform } from 'react-native';
import i18next from 'i18next';
import {Util} from '@cap-cross/cap-react-native';

export function getLocale() {
  const { SettingsManager, I18nManager } = NativeModules;

  if (Util.platformOS() === 'ios') {
    return SettingsManager.settings.AppleLocale;
  }
  return I18nManager.localeIdentifier;
}

export default function configureI18n(resources, browserLocale = 'ru', defaultLocale = 'ru') {
  const lng = browserLocale ? browserLocale.replace(/_/, '-') : defaultLocale;
  const fallbackLng = defaultLocale;

  return i18next.init({ fallbackLng, lng, resources });
}
