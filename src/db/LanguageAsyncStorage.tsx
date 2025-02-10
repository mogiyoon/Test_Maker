import AsyncStorage from '@react-native-async-storage/async-storage';

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