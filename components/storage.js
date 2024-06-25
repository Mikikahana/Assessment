import AsyncStorage from '@react-native-async-storage/async-storage';

export const getStoredItems = async () => {
  try {
    const storedItems = await AsyncStorage.getItem('items');
    return storedItems ? JSON.parse(storedItems) : [];
  } catch (error) {
    return [];
  }
};

export const saveStoredItems = async (items) => {
  try {
    await AsyncStorage.setItem('items', JSON.stringify(items));
  } catch (error) {
  }
};

export const validateInput = (name, description) => {
  if (!name.trim() || !description.trim()) {
    Alert.alert('Validation Error', 'Both name and description are required.');
    return false;
  }
  return true;
};
