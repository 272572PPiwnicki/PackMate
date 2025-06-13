import { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { getAllChecklists, deleteChecklist } from '../database/checklistModel';
import { initDatabase } from '../database/database';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const [checklists, setChecklists] = useState<{ id: number; name: string }[]>([]);
  const router = useRouter();

  useEffect(() => {
    initDatabase();
    loadChecklists();
  }, []);

  const loadChecklists = () => {
    const data = getAllChecklists();
    setChecklists(data);
  };

  const handleDelete = (id: number) => {
    deleteChecklist(id);
    loadChecklists();
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <Pressable
        onPress={() => router.push('/edit/new')}
        style={{
          backgroundColor: '#00A6FF',
          paddingVertical: 12,
          borderRadius: 999,
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Dodaj checklistę</Text>
      </Pressable>

      <FlatList
        data={checklists}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/checklist/${item.id}`)}
            style={{
              padding: 15,
              backgroundColor: '#eee',
              marginVertical: 5,
              borderRadius: 8,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 16 }}>{item.name}</Text>
            <Pressable
              onPress={() => handleDelete(item.id)}
              style={{
                backgroundColor: 'red',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 999,
              }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Usuń</Text>
            </Pressable>
          </Pressable>
        )}
      />
    </View>
  );
}
