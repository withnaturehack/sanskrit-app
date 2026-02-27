import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Button, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
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
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const load = useCallback(async (): Promise<void> => {
    const data = await dashboardDetailsApi();
    setStats(data);
  }, []);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      load()
        .then(() => {
          fadeAnim.setValue(0);
          Animated.timing(fadeAnim, { toValue: 1, duration: 450, useNativeDriver: true }).start();
        })
        .finally(() => setLoading(false));
    }, [fadeAnim, load])
  );

  const maxWeekCount = useMemo(() => Math.max(...stats.weekly.map((point) => point.count), 1), [stats.weekly]);

  if (loading) {
    return (
      <Screen>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#111827" />
          <Text style={styles.loadingText}>Loading dashboard...</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={async () => {
                setRefreshing(true);
                await load();
                setRefreshing(false);
              }}
            />
          }
        >
          <View style={styles.headerCard}>
            <Text style={styles.greeting}>Namaste, {user?.name}</Text>
            <Text style={styles.sub}>Your spiritual journey at a glance</Text>
          </View>

          <View style={styles.metricsWrap}>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Total Chants</Text>
              <Text style={styles.metricValue}>{stats.totalChants}</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Current Streak</Text>
              <Text style={styles.metricValue}>{stats.streak} days</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Top Mantras</Text>
            {stats.topMantras.length === 0 ? <Text style={styles.muted}>No chants yet.</Text> : null}
            {stats.topMantras.map((mantra) => (
              <Text key={mantra.mantraId} style={styles.rowText}>• {mantra.title}: {mantra.count}</Text>
            ))}
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Last 7 Days</Text>
            {stats.weekly.map((point) => {
              const widthPct = `${Math.max((point.count / maxWeekCount) * 100, 4)}%` as `${number}%`;
              return (
                <View key={point.date} style={styles.barRow}>
                  <Text style={styles.weekDate}>{point.date.slice(5)}</Text>
                  <View style={styles.barTrack}>
                    <View style={[styles.barFill, { width: widthPct }]} />
                  </View>
                  <Text style={styles.weekCount}>{point.count}</Text>
                </View>
              );
            })}
          </View>

          <Button title="Logout" onPress={logout} />
        </ScrollView>
      </Animated.View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 10,
    color: '#6B7280'
  },
  headerCard: {
    backgroundColor: '#111827',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12
  },
  greeting: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700'
  },
  sub: {
    color: '#CBD5E1',
    marginTop: 4
  },
  metricsWrap: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14
  },
  metricLabel: {
    color: '#6B7280',
    marginBottom: 4
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827'
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 8,
    color: '#111827'
  },
  muted: {
    color: '#6B7280'
  },
  rowText: {
    marginBottom: 6,
    color: '#374151'
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  weekDate: {
    width: 46,
    color: '#475569',
    fontWeight: '600'
  },
  barTrack: {
    flex: 1,
    height: 10,
    borderRadius: 999,
    backgroundColor: '#E2E8F0',
    overflow: 'hidden',
    marginHorizontal: 8
  },
  barFill: {
    height: '100%',
    backgroundColor: '#F59E0B',
    borderRadius: 999
  },
  weekCount: {
    color: '#0F172A',
    fontWeight: '700',
    width: 24,
    textAlign: 'right'
  }
});
