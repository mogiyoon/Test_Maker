import AsyncStorage from '@react-native-async-storage/async-storage';

export async function toggleTestSetting(testSettingParm: string) {
  const stringBoolValue = await readTestSetting(testSettingParm);
  const boolValue = stringBoolValue === 'true';
  const toggledBoolValue = !boolValue;
  const toggledStringValue = toggledBoolValue.toString();
  await AsyncStorage.setItem(testSettingParm, toggledStringValue);
}

export async function writeTestSetting(
  testSettingParm: string,
  toValue: string,
) {
  await AsyncStorage.setItem(testSettingParm, toValue);
}

export async function readTestSetting(testSettingParm: string) {
  const result = await AsyncStorage.getItem(testSettingParm);
  return result;
}

export async function initiateTestSettingStorage() {
  const initiateValue = await AsyncStorage.getItem('testSetting');
  const testSettingVersion = '1';
  const testSettingList = ['exportNum', 'showExportNum', 'showCommentary', 'showRightOnly'];
  const testSettingInitiateValue = ['0', 'false', 'false', 'false'];

  if (initiateValue === testSettingVersion) {
  } else {
    await AsyncStorage.setItem('testSetting', testSettingVersion);
    for (let i = 0; i < testSettingList.length; i++) {
      if ((await AsyncStorage.getItem(testSettingList[i])) === null) {
        await AsyncStorage.setItem(
          testSettingList[i],
          testSettingInitiateValue[i],
        );
      }
    }
  }
}