import { Audio } from 'expo-av';

export const playMantraAudio = async (uri: string): Promise<void> => {
  const { sound } = await Audio.Sound.createAsync({ uri });

  try {
    await sound.playAsync();
  } finally {
    sound.setOnPlaybackStatusUpdate((status) => {
      if ('didJustFinish' in status && status.didJustFinish) {
        void sound.unloadAsync();
      }
    });
  }
};
