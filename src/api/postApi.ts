import axiosInstance from './axiosInstance';
// postApi.ts

/** 파일 기반 업로드 */
export const createPostWithFile = (
  fileUri: string,
  { title, hashtags }: { title: string; hashtags: string[] },
  token: string,               // ★ 추가
) => {
  const fd = new FormData();
  fd.append('postDTO', {
    name: 'postDTO',
    type: 'application/json',
    string: JSON.stringify({ title, hashtags }),
  } as any);
  fd.append('videoFile', {
    uri: fileUri,
    name: 'video.mp4',
    type: 'video/mp4',
  } as any);

  return axiosInstance.post('/posts/upload', fd, {
    headers: { Authorization: `Bearer ${token}` },  // ★ 직접 세팅
  });
};

/** URL 기반 업로드 */
export const createPostWithUrl = (
  videoURL: string,
  { title, hashtags }: { title: string; hashtags: string[] },
  token: string,               // ★ 추가
) =>
  axiosInstance.post(
    '/posts',
    { title, hashtags, videoURL },
    { headers: { Authorization: `Bearer ${token}` } },   // ★ 직접 세팅
  );



// 📌 게시물 업로드용 Payload
export interface PostPayload {
  title: string;
  hashtags: string[];
  videoFile: File | Blob;
}

// 📌 게시물 응답 타입
export interface PostResponse {
  postId: number;
  title: string;
  updateTime: string;
  videoURL?: string;
  thumbnailURL?: string;
  likeCount: number;
  commentCount: number;
  hashtags: string[];
  author: {
    userId: number;
    userName: string;
    profileImage: string;
  };
}
// 🔹 URL 기반 업로드
/* export const createPostWithUrl = async ({
  title,
  hashtags,
  videoURL,
}: {
  title: string;
  hashtags: string[];
  videoURL: string;
}): Promise<{ message: string }> => {
  const response = await axiosInstance.post(
    '/posts',
    {
      title,
      hashtags,
      videoURL,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
}; */

// 🔹 게시물 등록
export const createPost = async (
  payload: PostPayload,
): Promise<{ message: string }> => {
  const formData = new FormData();

  formData.append(
    'postDTO',
    new Blob(
      [JSON.stringify({ title: payload.title, hashtags: payload.hashtags })],
      { type: 'application/json' }
    )
  );

  formData.append('videoFile', payload.videoFile);

  const response = await axiosInstance.post('/posts/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};


// 🔹 전체 게시물 조회
export const getAllPosts = async (): Promise<PostResponse[]> => {
  const response = await axiosInstance.get('/posts');
  return response.data;
};

// 🔹 게시물 재생 (상세 조회)
export const getPostById = async (postId: number): Promise<PostResponse> => {
  const response = await axiosInstance.get(`/posts/${postId}`);
  return response.data;
};

// 🔹 내 게시물 조회
export const getMyPosts = async (): Promise<PostResponse[]> => {
  const response = await axiosInstance.get('/posts/mine');
  return response.data;
};

// 🔹 특정 해시태그 게시물 조회
export const getPostsByHashtag = async (
  hashtag: string,
): Promise<PostResponse[]> => {
  const response = await axiosInstance.get('/posts', {
    params: {hashtag},
  });
  return response.data;
};

// 🔹 게시물 삭제
export const deletePost = async (
  postId: number,
): Promise<{message: string}> => {
  const response = await axiosInstance.delete(`/posts/${postId}`);
  return response.data;
};

// 🔹 게시물 수정
export const updatePost = async (
  postId: number,
  payload: {
    title: string;
    videoURL: string;
    hashtags: string[];
  },
): Promise<PostResponse> => {
  const response = await axiosInstance.put(`/posts/${postId}`, payload);
  return response.data;
};

export const getPostThumbnails = async (): Promise<PostThumbnail[]> => {
  const response = await axiosInstance.get('/posts');
  const data: PostResponse[] = response.data;

  // 필요한 필드만 추려서 반환
  return data.map(post => ({
    postId: post.postId,
    title: post.title,
    thumbnailURL: post.thumbnailURL ?? '',
    author: {
      userId: post.author.userId,
      userName: post.author.userName,
      profileImage: post.author.profileImage,
    },
  }));
};