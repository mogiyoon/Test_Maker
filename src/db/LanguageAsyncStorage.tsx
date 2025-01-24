import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from '../redux/ReduxStore';
import { setLanguageData } from '../redux/LanguageSlice';

const language = 'Language';
export const languageIndex = {
  English : 'English',
  Korean : 'Korean',
};

export async function writeLanguageSetting(
  inputLanguage: string
) {
  await AsyncStorage.setItem(language, languageIndex[inputLanguage]);
}

export async function readLanguageSetting() {
  const result = await AsyncStorage.getItem(language);
  return result;
}

export async function initiateLanguageStorage() {
  const initiateValue = await AsyncStorage.getItem('LanguageSetting');
  const LanguageSettingVersion = '1';

  if (initiateValue === LanguageSettingVersion) {
  } else {
    await AsyncStorage.setItem('LanguageSetting', LanguageSettingVersion);
    await AsyncStorage.setItem( language, languageIndex.English)
  }
}

export const languageSettingInit = async () => {
  const savedLanguage = await readLanguageSetting();

  store.dispatch(setLanguageData(savedLanguage));
};