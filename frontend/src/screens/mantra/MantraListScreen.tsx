import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../../components/Screen';
import { MantraStackParamList } from '../../navigation/types';
import { fetchMantras } from '../../services/api';
import { Mantra } from '../../types';
import { getErrorMessage } from '../../utils/errors';

type Props = NativeStackScreenProps<MantraStackParamList, 'MantraList'>;

export const MantraListScreen = ({ navigation }: Props): JSX.Element => {
  const [mantras, setMantras] = useState<Mantra[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async (): Promise<void> => {
    try {
      const data = await fetchMantras();
      setMantras(data);
    } catch (error) {
      Alert.alert('Failed to load mantras', getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <Screen>
        <View style={styles.empty}><ActivityIndicator size="large" color="#111827" /></View>
      </Screen>
    );
  }

  return (
    <Screen>
      <FlatList
        data={mantras}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={async () => { setRefreshing(true); await load(); setRefreshing(false); }} />}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Pressable style={styles.card} onPress={() => navigation.navigate('MantraDetail', { mantraId: item._id })}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.meta}>{item.category}</Text>
          </Pressable>
        )}
        ListEmptyComponent={<View style={styles.empty}><Text>No mantras available.</Text></View>}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827'
  },
  meta: {
    marginTop: 4,
    color: '#6B7280'
  },
  empty: {
    paddingTop: 40,
    alignItems: 'center'
  }
});
