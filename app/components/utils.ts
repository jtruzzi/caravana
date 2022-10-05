import AsyncStorage from "@react-native-async-storage/async-storage";

export const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue !== null ? JSON.parse(jsonValue) : {};
  } catch (err) {
    console.log(err);
  }
};

export const setData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (err) {
    console.log(err);
  }
};
