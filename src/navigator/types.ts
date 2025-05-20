export type AppStackParamList = {
  Main: {
    screen: 'Home';
    params?: {
      newPost?: {
        id: string;
        title: string;
        creator: string;
        thumbnail: string;
      };
    };
  };
  Auth: undefined;
  ShortsStack: undefined;
  PhotoStack: undefined;

  ShortsPlayerScreen: {
    postId: number;
    title: string;
    creator: string;
    currentUserId: number;
    creatorUserId: number;
    showComments: boolean;
  };
 URLPosting: {
    finalVideoUrl: string | null;
    title: string;
    tags: string;
  };
  FilePosting: {
    finalVideoUrl: string | null;
    title: string;
    tags: string;
  };
};
