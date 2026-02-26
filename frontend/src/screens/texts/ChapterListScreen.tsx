import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, Text } from 'react-native';
import { Screen } from '../../components/Screen';
import { TextStackParamList } from '../../navigation/types';
import { fetchChapters } from '../../services/api';
import { Chapter } from '../../types';

type Props = NativeStackScreenProps<TextStackParamList, 'ChapterList'>;

export const ChapterListScreen = ({ route, navigation }: Props): JSX.Element => {
  const [chapters, setChapters] = useState<Chapter[]>([]);

  useEffect(() => {
    fetchChapters(route.params.bookId).then(setChapters);
  }, [route.params.bookId]);

  return (
    <Screen>
      <FlatList
        data={chapters}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate('VerseList', { chapterId: item._id })}>
            <Text style={{ fontSize: 18, paddingVertical: 10 }}>Chapter {item.chapterNumber}: {item.title}</Text>
          </Pressable>
        )}
      />
    </Screen>
  );
};
