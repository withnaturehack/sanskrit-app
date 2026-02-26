import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { Screen } from '../../components/Screen';
import { dashboardDetailsApi } from '../../services/api';
import { useAuthStore } from '../../store/useAuthStore';
import { DashboardDetails } from '../../types';

const initialStats: DashboardDetails = {
  totalChants: 0,
  streak: 0,
  weekly: [],
  topMantras: []
};

export const DashboardScreen = (): JSX.Element => {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const [stats, setStats] = useState<DashboardDetails>(initialStats);

  useEffect(() => {
    dashboardDetailsApi().then(setStats);
  }, []);

  return (
    <Screen>
      <Text style={{ fontSize: 20, marginBottom: 16 }}>Namaste, {user?.name}</Text>
      <Text style={{ fontSize: 18 }}>Total Chants: {stats.totalChants}</Text>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Current Streak: {stats.streak} days</Text>

      <Text style={{ fontSize: 16, marginBottom: 8 }}>Top Mantras</Text>
      {stats.topMantras.length === 0 ? <Text style={{ marginBottom: 12 }}>No chants yet.</Text> : null}
      {stats.topMantras.map((mantra) => (
        <Text key={mantra.mantraId} style={{ marginBottom: 6 }}>
          • {mantra.title}: {mantra.count}
        </Text>
      ))}

      <View style={{ marginVertical: 12 }}>
        <Text style={{ fontSize: 16, marginBottom: 8 }}>Last 7 Days</Text>
        {stats.weekly.map((point) => (
          <Text key={point.date}>{point.date}: {point.count}</Text>
        ))}
      </View>

      <Button title="Logout" onPress={logout} />
    </Screen>
  );
};
