import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { Screen } from '../../components/Screen';
import { createAlarmApi, deleteAlarmApi, fetchAlarms } from '../../services/api';
import { Alarm } from '../../types';
import { scheduleMantraAlarm } from '../../utils/notifications';

export const AlarmScreen = (): JSX.Element => {
  const [mantraId, setMantraId] = useState('');
  const [hour, setHour] = useState('6');
  const [minute, setMinute] = useState('0');
  const [alarms, setAlarms] = useState<Alarm[]>([]);

  const loadAlarms = async (): Promise<void> => {
    const data = await fetchAlarms();
    setAlarms(data);
  };

  useEffect(() => {
    loadAlarms();
  }, []);

  return (
    <Screen>
      <View style={styles.card}>
        <Text style={styles.title}>Smart Mantra Alarm</Text>
        <Text style={styles.label}>Mantra ID</Text>
        <TextInput value={mantraId} onChangeText={setMantraId} style={styles.input} placeholder="Paste mantra id" />
        <Text style={styles.label}>Hour (0-23)</Text>
        <TextInput keyboardType="number-pad" value={hour} onChangeText={setHour} style={styles.input} />
        <Text style={styles.label}>Minute (0-59)</Text>
        <TextInput keyboardType="number-pad" value={minute} onChangeText={setMinute} style={styles.input} />

        <Button
          title="Set Smart Alarm"
          onPress={async () => {
            try {
              const hourNum = Number(hour);
              const minuteNum = Number(minute);

              if (!mantraId || Number.isNaN(hourNum) || Number.isNaN(minuteNum) || hourNum < 0 || hourNum > 23 || minuteNum < 0 || minuteNum > 59) {
                Alert.alert('Invalid values', 'Please enter valid mantra id, hour, and minute.');
                return;
              }

              await createAlarmApi({ mantraId, hour: hourNum, minute: minuteNum, enabled: true, repeatDays: [1, 2, 3, 4, 5] });
              await scheduleMantraAlarm(hourNum, minuteNum, 'Vedamitra Alarm', 'Time for your mantra practice.');
              await loadAlarms();
              Alert.alert('Success', 'Alarm and local notification scheduled');
            } catch {
              Alert.alert('Error', 'Failed to schedule alarm.');
            }
          }}
        />
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
                <Text style={styles.itemSub}>Mantra: {item.mantraId}</Text>
              </View>
              <Button
                title="Delete"
                onPress={async () => {
                  await deleteAlarmApi(item._id);
                  await loadAlarms();
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
  }
});
