import AsyncStorage from '@react-native-async-storage/async-storage';

//Setting은 기능이 자주 변경되지만 많은 데이터를 사용하지 않으므로 async storage 사용
export async function toggleMakerSetting(makerSettingParm: string) {
  const stringBoolValue = await readMakerSetting(makerSettingParm);
  const boolValue = stringBoolValue === 'true';
  const toggledBoolValue = !boolValue;
  const toggledStringValue = toggledBoolValue.toString();
  await AsyncStorage.setItem(makerSettingParm, toggledStringValue);
}

export async function writeMakerSetting(
  makerSettingParm: string,
  toValue: string,
) {
  await AsyncStorage.setItem(makerSettingParm, toValue);
}

export async function readMakerSetting(makerSettingParm: string) {
  const result = await AsyncStorage.getItem(makerSettingParm);
  return result;
}

export async function initiateMakerSettingStorage() {
  const initiateValue = await AsyncStorage.getItem('makerSetting');
  const makerSettingVersion = '1';
  const makerSettingList = ['wordInsideMean', 'name', 'mean'];
  const makerSettingInitiateValue = ['false', '[]', "''"];

  if (initiateValue === makerSettingVersion) {
  } else {
    await AsyncStorage.setItem('makerSetting', makerSettingVersion);
    for (let i = 0; i < makerSettingList.length; i++) {
      if ((await AsyncStorage.getItem(makerSettingList[i])) === null) {
        await AsyncStorage.setItem(
          makerSettingList[i],
          makerSettingInitiateValue[i],
        );
      }
    }
  }
}
