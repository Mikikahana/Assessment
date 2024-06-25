import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { getStoredItems, saveStoredItems } from '../storage';

const ListScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);

  const loadItems = async () => {
    try {
      const storedItems = await getStoredItems();
      setItems(storedItems);
    } catch (error) {}
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadItems();
    });

    return unsubscribe;
  }, [navigation]);

  const updateItems = async (updatedItems) => {
    try {
      await saveStoredItems(updatedItems);
      setItems(updatedItems);
    } catch (error) {}
  };

  const handleItemAction = async (index, action) => {
    const newItems = [...items];
    if (action === 'delete') {
      newItems.splice(index, 1);
    } else if (action === 'edit') {
      navigation.navigate('AddItem', { item: items[index], index });
      return;
    }

    await updateItems(newItems);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <View style={styles.itemText}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <View style={styles.itemButtons}>
        <Button style={styles.button} title="Edit" onPress={() => handleItemAction(index, 'edit')} />
        <Button style={styles.button} title="Delete" onPress={() => handleItemAction(index, 'delete')} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No items found.</Text>
          </View>
        )}
      />
      <Button title="Add Item" onPress={() => navigation.navigate('AddItem')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    flex: 1,
  },
  itemButtons: {
    flexDirection: 'row',
    marginTop: 8,
  },
  button: {
    marginLeft: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

export default ListScreen;
