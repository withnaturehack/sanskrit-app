import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Pressable, Text } from 'react-native';
import { Screen } from '../../components/Screen';
import { TextStackParamList } from '../../navigation/types';
import { fetchBooks } from '../../services/api';
import { Book } from '../../types';
import { getErrorMessage } from '../../utils/errors';

type Props = NativeStackScreenProps<TextStackParamList, 'BookList'>;

export const BookListScreen = ({ navigation }: Props): JSX.Element => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks()
      .then(setBooks)
      .catch((error) => Alert.alert('Failed to load books', getErrorMessage(error)))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Screen><ActivityIndicator size="large" color="#111827" /></Screen>;
  }

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
