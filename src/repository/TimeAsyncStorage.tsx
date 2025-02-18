import AsyncStorage from '@react-native-async-storage/async-storage';

export async function writeConvertTimePlusOne() {
  const boolValue = await _writeConvertTime(1);
  return boolValue;
}

export async function writeConvertTimeMinusOne() {
  const boolValue = await _writeConvertTime(-1);
  return boolValue;
}

export async function canWriteConvertTime() {
  const nowConvertTime = await readConvertTime();
  if (nowConvertTime >= 1) {
    return true;
  } else {
    return false;
  }
}

async function _writeConvertTime(num) {
  const nowNumValue = await readConvertTime();
  const maxNumValue = await readMaxTime();

  if (nowNumValue + num >= 0 && nowNumValue + num <= maxNumValue) {
    const afterNumValue = nowNumValue + num;
    const afterStrValue = afterNumValue.toString();
    await AsyncStorage.setItem('convertTime', afterStrValue);
    return true;
  } else {
    return false;
  }
}

export async function readMaxTime() {
  const readMaxStrValue = await AsyncStorage.getItem('maxConvertTime');
  const readMaxNumValue = parseInt(readMaxStrValue);
  return readMaxNumValue;
}

export async function readConvertTime() {
  const readStrValue = await AsyncStorage.getItem('convertTime');
  const readNumValue = parseInt(readStrValue);
  return readNumValue;
}

export async function initiateTimeStorage() {
  const initiateValue = await AsyncStorage.getItem('convertTime');
  if (initiateValue === null) {
    AsyncStorage.setItem('convertTime', '2');
    AsyncStorage.setItem('maxConvertTime', '5');
  }
}
