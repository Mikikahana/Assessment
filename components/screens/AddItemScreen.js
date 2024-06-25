import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getStoredItems, saveStoredItems, validateInput } from '../storage';

const AddItemScreen = ({ route, navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [index, setIndex] = useState(null);

  useEffect(() => {
    if (route.params && route.params.item) {
      const { item, index } = route.params;
      setName(item.name);
      setDescription(item.description);
      setIndex(index);
    }
  }, [route.params]);

  const saveItem = async () => {
    if (!validateInput(name, description)) return;

    const newItem = { name, description };
    const items = await getStoredItems();

    if (index !== null) {
      items[index] = newItem;
    } else {
      items.push(newItem);
    }

    await saveStoredItems(items);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <Text>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <Button title={index !== null ? "Save Changes" : "Add Item"} onPress={saveItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginVertical: 8,
  },
});

export default AddItemScreen;
