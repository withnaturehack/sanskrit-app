import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, Button, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Screen } from '../../components/Screen';
import { createAlarmApi, deleteAlarmApi, fetchAlarms, fetchMantras } from '../../services/api';
import { Alarm, Mantra } from '../../types';
import { scheduleMantraAlarm } from '../../utils/notifications';
import { getErrorMessage } from '../../utils/errors';

export const AlarmScreen = (): JSX.Element => {
  const [selectedMantraId, setSelectedMantraId] = useState<string>('');
  const [hour, setHour] = useState('6');
  const [minute, setMinute] = useState('0');
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [mantras, setMantras] = useState<Mantra[]>([]);
  const [loading, setLoading] = useState(true);

  const mantraMap = useMemo(() => new Map(mantras.map((mantra) => [mantra._id, mantra.title])), [mantras]);

  const load = async (): Promise<void> => {
    try {
      const [alarmData, mantraData] = await Promise.all([fetchAlarms(), fetchMantras()]);
      setAlarms(alarmData);
      setMantras(mantraData);

      if (!selectedMantraId && mantraData.length > 0) {
        setSelectedMantraId(mantraData[0]._id);
      }
    } catch (error) {
      Alert.alert('Failed to load', getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onCreateAlarm = async (): Promise<void> => {
    try {
      const hourNum = Number(hour);
      const minuteNum = Number(minute);

      if (!selectedMantraId || Number.isNaN(hourNum) || Number.isNaN(minuteNum) || hourNum < 0 || hourNum > 23 || minuteNum < 0 || minuteNum > 59) {
        Alert.alert('Invalid values', 'Select mantra and enter valid hour/minute.');
        return;
      }

      await createAlarmApi({ mantraId: selectedMantraId, hour: hourNum, minute: minuteNum, enabled: true, repeatDays: [1, 2, 3, 4, 5] });
      const mantraTitle = mantraMap.get(selectedMantraId) ?? 'Mantra Practice';
      await scheduleMantraAlarm(hourNum, minuteNum, 'Vedamitra Alarm', `Time for ${mantraTitle}`);
      await load();
      Alert.alert('Success', 'Alarm scheduled successfully');
    } catch (error) {
      Alert.alert('Error', getErrorMessage(error, 'Failed to schedule alarm.'));
    }
  };

  if (loading) {
    return (
      <Screen>
        <View style={styles.loadingWrap}>
          <ActivityIndicator size="large" color="#111827" />
          <Text style={styles.loadingText}>Loading alarms...</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <View style={styles.card}>
        <Text style={styles.title}>Smart Mantra Alarm</Text>

        <Text style={styles.label}>Choose Mantra</Text>
        <View style={styles.chipsWrap}>
          {mantras.map((mantra) => {
            const active = mantra._id === selectedMantraId;
            return (
              <Pressable
                key={mantra._id}
                style={[styles.chip, active ? styles.chipActive : null]}
                onPress={() => setSelectedMantraId(mantra._id)}
              >
                <Text style={[styles.chipText, active ? styles.chipTextActive : null]}>{mantra.title}</Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.label}>Hour (0-23)</Text>
        <TextInput keyboardType="number-pad" value={hour} onChangeText={setHour} style={styles.input} />
        <Text style={styles.label}>Minute (0-59)</Text>
        <TextInput keyboardType="number-pad" value={minute} onChangeText={setMinute} style={styles.input} />

        <Button title="Set Alarm" onPress={onCreateAlarm} />
      </View>

      <View style={styles.listWrap}>
        <Text style={styles.title}>Your Alarms</Text>
        <FlatList
          data={alarms}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View>
                <Text style={styles.itemTime}>{String(item.hour).padStart(2, '0')}:{String(item.minute).padStart(2, '0')}</Text>
                <Text style={styles.itemSub}>{mantraMap.get(item.mantraId) ?? item.mantraId}</Text>
              </View>
              <Button
                title="Delete"
                color="#B91C1C"
                onPress={async () => {
                  await deleteAlarmApi(item._id);
                  await load();
                }}
              />
            </View>
          )}
          ListEmptyComponent={<Text style={styles.empty}>No alarms set yet.</Text>}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#111827'
  },
  label: {
    color: '#374151',
    fontWeight: '600',
    marginBottom: 6
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FAFAFA',
    marginBottom: 10
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10
  },
  chip: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999
  },
  chipActive: {
    backgroundColor: '#111827',
    borderColor: '#111827'
  },
  chipText: {
    color: '#374151',
    fontSize: 12,
    fontWeight: '600'
  },
  chipTextActive: {
    color: '#FFFFFF'
  },
  listWrap: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F3',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemTime: {
    fontSize: 17,
    fontWeight: '700'
  },
  itemSub: {
    color: '#6B7280',
    marginTop: 2
  },
  empty: {
    color: '#6B7280',
    marginTop: 10
  },
  loadingWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 8,
    color: '#6B7280'
  }
});
