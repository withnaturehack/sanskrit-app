import { Audio } from 'expo-av';

export const playMantraAudio = async (uri: string): Promise<void> => {
  const { sound } = await Audio.Sound.createAsync({ uri });
  await sound.playAsync();
};
