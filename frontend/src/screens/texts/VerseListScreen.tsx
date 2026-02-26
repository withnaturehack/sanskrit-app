import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';
import { Screen } from '../../components/Screen';
import { TextStackParamList } from '../../navigation/types';
import { fetchVerses } from '../../services/api';
import { Verse } from '../../types';

type Props = NativeStackScreenProps<TextStackParamList, 'VerseList'>;

export const VerseListScreen = ({ route }: Props): JSX.Element => {
  const [verses, setVerses] = useState<Verse[]>([]);

  useEffect(() => {
    fetchVerses(route.params.chapterId).then(setVerses);
  }, [route.params.chapterId]);

  return (
    <Screen>
      <FlatList
        data={verses}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Text style={{ paddingVertical: 8 }}>
            {item.verseNumber}. {item.text}{'\n'}{item.meaning}
          </Text>
        )}
      />
    </Screen>
  );
};
