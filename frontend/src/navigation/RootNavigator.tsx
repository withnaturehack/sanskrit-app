import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { AlarmScreen } from '../screens/alarm/AlarmScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { DashboardScreen } from '../screens/dashboard/DashboardScreen';
import { MantraDetailScreen } from '../screens/mantra/MantraDetailScreen';
import { MantraListScreen } from '../screens/mantra/MantraListScreen';
import { BookListScreen } from '../screens/texts/BookListScreen';
import { ChapterListScreen } from '../screens/texts/ChapterListScreen';
import { VerseListScreen } from '../screens/texts/VerseListScreen';
import { AuthStackParamList, MainTabParamList, MantraStackParamList, TextStackParamList } from './types';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainTabs = createBottomTabNavigator<MainTabParamList>();
const MantraStack = createNativeStackNavigator<MantraStackParamList>();
const TextStack = createNativeStackNavigator<TextStackParamList>();

const MantraNavigator = (): JSX.Element => (
  <MantraStack.Navigator>
    <MantraStack.Screen name="MantraList" component={MantraListScreen} options={{ title: 'Mantras' }} />
    <MantraStack.Screen name="MantraDetail" component={MantraDetailScreen} options={{ title: 'Mantra Detail' }} />
  </MantraStack.Navigator>
);

const TextNavigator = (): JSX.Element => (
  <TextStack.Navigator>
    <TextStack.Screen name="BookList" component={BookListScreen} options={{ title: 'Sacred Texts' }} />
    <TextStack.Screen name="ChapterList" component={ChapterListScreen} options={{ title: 'Chapters' }} />
    <TextStack.Screen name="VerseList" component={VerseListScreen} options={{ title: 'Verses' }} />
  </TextStack.Navigator>
);

const MainNavigator = (): JSX.Element => (
  <MainTabs.Navigator>
    <MainTabs.Screen name="Dashboard" component={DashboardScreen} />
    <MainTabs.Screen name="Mantras" component={MantraNavigator} options={{ headerShown: false }} />
    <MainTabs.Screen name="Texts" component={TextNavigator} options={{ headerShown: false }} />
    <MainTabs.Screen name="Alarm" component={AlarmScreen} />
  </MainTabs.Navigator>
);

export const RootNavigator = (): JSX.Element => {
  const token = useAuthStore((state) => state.token);

  if (!token) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen name="Login" component={LoginScreen} />
        <AuthStack.Screen name="Register" component={RegisterScreen} />
      </AuthStack.Navigator>
    );
  }

  return <MainNavigator />;
};
