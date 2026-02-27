export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Mantras: undefined;
  Texts: undefined;
  Alarm: undefined;
};

export type MantraStackParamList = {
  MantraList: undefined;
  MantraDetail: { mantraId: string };
};

export type TextStackParamList = {
  BookList: undefined;
  ChapterList: { bookId: string };
  VerseList: { chapterId: string };
};
