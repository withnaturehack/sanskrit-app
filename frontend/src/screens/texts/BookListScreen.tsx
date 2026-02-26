import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, Text } from 'react-native';
import { Screen } from '../../components/Screen';
import { TextStackParamList } from '../../navigation/types';
import { fetchBooks } from '../../services/api';
import { Book } from '../../types';

type Props = NativeStackScreenProps<TextStackParamList, 'BookList'>;

export const BookListScreen = ({ navigation }: Props): JSX.Element => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetchBooks().then(setBooks);
  }, []);

  return (
    <Screen>
      <FlatList
        data={books}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate('ChapterList', { bookId: item._id })}>
            <Text style={{ fontSize: 18, paddingVertical: 10 }}>{item.title}</Text>
          </Pressable>
        )}
      />
    </Screen>
  );
};
