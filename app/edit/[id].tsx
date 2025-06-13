import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { addChecklist, getAllChecklists } from '../../database/checklistModel';
import { addItem } from '../../database/itemModel';

export default function CreateChecklistScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [name, setName] = useState('');
  const [newItem, setNewItem] = useState('');
  const [items, setItems] = useState<string[]>([]);

  const handleAddItem = () => {
    if (!newItem.trim()) return;
    setItems([...items, newItem.trim()]);
    setNewItem('');
  };

  const handleRemoveItem = (index: number) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const handleSave = () => {
    if (!name.trim()) return;

    addChecklist(name.trim());

    const all = getAllChecklists();
    const newest = all[all.length - 1];
    const checklistId = newest.id;

    items.forEach((itemName) => {
      addItem(checklistId, itemName);
    });

    router.replace(`/`);
  };

  if (id !== 'new') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Ten widok służy tylko do tworzenia nowych checklist</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{ fontSize: 18, marginBottom: 6 }}>Nazwa nowej checklisty:</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Nazwa checklisty"
          placeholderTextColor="#999"
          style={{
            borderWidth: 1,
            borderColor: '#aaa',
            borderRadius: 8,
            padding: 10,
            marginBottom: 20,
            color: '#000',
          }}
        />

        <Text style={{ fontSize: 18, marginBottom: 6 }}>Przedmioty:</Text>
        {items.map((item, index) => (
          <Pressable
            key={index}
            onLongPress={() => handleRemoveItem(index)}
            style={{
              padding: 10,
              backgroundColor: '#eee',
              borderRadius: 8,
              marginVertical: 4,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ color: '#000' }}>{item}</Text>
            <Text style={{ color: 'red' }}>Usuń</Text>
          </Pressable>
        ))}

        <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
          <TextInput
            value={newItem}
            onChangeText={setNewItem}
            placeholder="Dodaj przedmiot"
            placeholderTextColor="#999"
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: '#aaa',
              borderRadius: 8,
              padding: 10,
              marginRight: 10,
              color: '#000',
            }}
          />
          <Pressable
            onPress={handleAddItem}
            style={{
              backgroundColor: '#00A6FF',
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 999,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Dodaj</Text>
          </Pressable>
        </View>

        <View style={{ marginTop: 30 }}>
          <Pressable
            onPress={handleSave}
            style={{
              backgroundColor: '#00A6FF',
              paddingVertical: 12,
              borderRadius: 999,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Zapisz checklistę</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
