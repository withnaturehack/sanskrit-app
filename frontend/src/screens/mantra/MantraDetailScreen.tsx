import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../../components/Screen';
import { MantraStackParamList } from '../../navigation/types';
import { fetchMantra } from '../../services/api';
import { useChantStore } from '../../store/useChantStore';
import { Mantra } from '../../types';
import { playMantraAudio } from '../../utils/audio';

type Props = NativeStackScreenProps<MantraStackParamList, 'MantraDetail'>;

export const MantraDetailScreen = ({ route }: Props): JSX.Element => {
  const [mantra, setMantra] = useState<Mantra | null>(null);
  const increment = useChantStore((state) => state.increment);
  const localCount = useChantStore((state) => state.localCounts[route.params.mantraId] ?? 0);

  useEffect(() => {
    fetchMantra(route.params.mantraId).then(setMantra);
  }, [route.params.mantraId]);

  if (!mantra) {
    return <Screen><Text>Loading mantra...</Text></Screen>;
  }

  return (
    <Screen>
      <ScrollView>
        <View style={styles.card}>
          <Text style={styles.title}>{mantra.title}</Text>
          <Text style={styles.sectionLabel}>Sanskrit</Text>
          <Text style={styles.body}>{mantra.text}</Text>
          <Text style={styles.sectionLabel}>Transliteration</Text>
          <Text style={styles.body}>{mantra.transliteration}</Text>
          <Text style={styles.sectionLabel}>Meaning</Text>
          <Text style={styles.body}>{mantra.meaning}</Text>

          <View style={styles.actions}>
            <Button title="Chant +1" onPress={() => increment(mantra._id)} />
            <Text style={styles.count}>Local Count: {localCount}</Text>
            {mantra.audioUrl ? <Button title="Play Audio" onPress={() => playMantraAudio(mantra.audioUrl as string)} /> : null}
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
    color: '#111827'
  },
  sectionLabel: {
    fontSize: 12,
    color: '#6B7280',
    textTransform: 'uppercase',
    marginTop: 10,
    marginBottom: 4
  },
  body: {
    fontSize: 16,
    color: '#1F2937',
    lineHeight: 24
  },
  actions: {
    marginTop: 16,
    gap: 8
  },
  count: {
    fontWeight: '600',
    color: '#374151',
    marginVertical: 8
  }
});
