import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowAlert: true
  })
});

export const scheduleMantraAlarm = async (
  hour: number,
  minute: number,
  title: string,
  body: string
): Promise<string> => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Notification permission denied');
  }

  return Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: {
      hour,
      minute,
      repeats: true
    }
  });
};
