import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
    useWindowDimensions,
Platform,
ActivityIndicator,
Animated,
} from 'react-native';
import Video from 'react-native-video';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import styles from '../../styles/common/postVideoStyles';
import {StackNavigationProp} from '@react-navigation/stack';
import {createPost} from '../../api/postApi';
import {useUser} from '../../context/UserContext';
import {AppStackParamList} from '../../navigator/types';
import {launchImageLibrary} from 'react-native-image-picker';
import CommonButton from '../../styles/button';
import Icon from 'react-native-vector-icons/Feather';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import {BASE_URL} from '@env';
import * as Progress from 'react-native-progress';
import { useRoute } from '@react-navigation/native';

interface Props {
  navigation: StackNavigationProp<AppStackParamList, 'URLPosting'>;
}


const URLPosting: React.FC<Props> = ({navigation}) => {
  const {width, height} = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const {user} = useUser();
    const [uploadProgress, setUploadProgress] = useState<number>(0); // 0~100%
    const [uploading, setUploading] = useState(false);
const [videoLoading, setVideoLoading] = useState(false);
  const route = useRoute();
  const { finalVideoUrl } = route.params as { finalVideoUrl: string };
const [titleError, setTitleError] = useState('');
const [tagsError, setTagsError] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [videoURI, setVideoURI] = useState<string | null>(finalVideoUrl || null);
  const handleTagInput = (text: string) => {
    const words = text.split(/[\s\n]+/); // 단어 단위 분할
const shakeTitle = useRef(new Animated.Value(0)).current;
const shakeTags = useRef(new Animated.Value(0)).current;


    const processed = words
      .filter(word => word.length > 0) // 빈 문자열 제거
      .map(word => (word.startsWith('#') ? word : `#${word}`)); // # 붙이기

    const lastChar = text.slice(-1);
    const needsSpace = lastChar === ' ' || lastChar === '\n';

    setTags(processed.join(' ') + (needsSpace ? ' ' : ''));
  };
const startShake = (animatedValue: Animated.Value) => {
  Animated.sequence([
    Animated.timing(animatedValue, {
      toValue: 10,
      duration: 50,
      useNativeDriver: true,
    }),
    Animated.timing(animatedValue, {
      toValue: -10,
      duration: 50,
      useNativeDriver: true,
    }),
    Animated.timing(animatedValue, {
      toValue: 6,
      duration: 50,
      useNativeDriver: true,
    }),
    Animated.timing(animatedValue, {
      toValue: -6,
      duration: 50,
      useNativeDriver: true,
    }),
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }),
  ]).start();
};

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/youtube.upload'],
      webClientId: 'YOUR_WEB_CLIENT_ID',
    });
  }, []);
useEffect(() => {
  const fetchToken = async () => {
    const savedToken = await getAccessToken();
    console.log('🧾 저장된 토큰 from 스토리지:', savedToken);
  };
  fetchToken();
}, []);

const handlePickVideo = async () => {
  try {
    setVideoLoading(true); // 로딩 시작
    const result = await launchImageLibrary({mediaType: 'video', selectionLimit: 1});
    if (result.assets?.length) {
      const selected = result.assets[0];
      if (selected.uri) setVideoURI(selected.uri);
    }
  } catch (error) {
    console.error('미디어 선택 오류:', error);
  } finally {
    setVideoLoading(false); // 로딩 종료
  }
};

  const uploadToYouTube = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn();
      const token = (await GoogleSignin.getTokens()).accessToken;

      const form = new FormData();
      form.append('video', {
        uri: videoURI,
        type: 'video/mp4',
        name: 'upload.mp4',
      } as any);
      form.append('snippet', JSON.stringify({ title: title || 'Untitled', description: tags }));
      form.append('status', JSON.stringify({ privacyStatus: 'unlisted' }));

      const response = await axios.post(
        'https://www.googleapis.com/upload/youtube/v3/videos?part=snippet,status',
        form,
        {
          headers: {
  Authorization: `Bearer ${user?.token}`,
            'Content-Type': 'multipart/form-data',
          },
          params: { uploadType: 'multipart' },
        }
      );

      Alert.alert('YouTube 업로드 완료', '영상이 YouTube에 업로드되었습니다.');
      console.log('YouTube 업로드 성공:', response.data);
    } catch (error: any) {
      console.error('YouTube 업로드 실패:', error?.response || error);
      Alert.alert('에러', 'YouTube 업로드에 실패했습니다.');
    }
  };


// ✅ 올바른 수정
const uploadToMyServer = async (
  title: string,
  tags: string,
  videoURI: string | null,
  token: string | undefined
) => {
  if (!videoURI) {
    Alert.alert('오류', '업로드할 영상을 선택해주세요.');
    return;
  }

  if (!user?.token) {
    Alert.alert('로그인이 필요합니다');
    return;
  }

  setUploading(true);
  setUploadProgress(0);

  try {
    const formData = new FormData();
    const postDTO = {
      title: title.trim(),
      hashtags: tags.split(/[#,\s]+/).filter(Boolean),
    };

    formData.append('postDTO', {
      name: 'postDTO',
      type: 'application/json',
      string: JSON.stringify(postDTO),
    } as any);

    formData.append('videoFile', {
      uri: videoURI,
      type: 'video/mp4',
      name: 'video.mp4',
    } as any);

    const response = await axios.post(`${BASE_URL}:8080/posts/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user.token}`,
      },
      onUploadProgress: e => {
        const percent = Math.round((e.loaded * 100) / e.total);
        setUploadProgress(percent);
      },
    });

    Alert.alert('성공', '업로드 완료');
  } catch (err) {
    console.error('❌ 업로드 실패:', err?.response?.data || err.message);
    Alert.alert('에러', '업로드 실패');
  } finally {
    setUploading(false);
  }
};
const handleUpload = () => {
  let valid = true;

if (!title.trim()) {
  setTitleError('제목을 입력해주세요.');
  startShake(shakeTitle); // 흔들기 실행
  valid = false;
}

if (!tags.trim()) {
  setTagsError('태그를 입력해주세요.');
  startShake(shakeTags); // 흔들기 실행
  valid = false;
}


  if (!valid) return;

  setUploading(true);
  uploadToMyServer(title, tags, videoURI, user?.token).finally(() =>
    setUploading(false),
  );
};


  return (
<SafeAreaView style={[styles.container, {paddingTop: 0, flex: 1}]}>
      <View style={{flex: 1, justifyContent: 'space-between', alignItems: 'center'}}>

        <View style={{alignItems: 'center'}}>
   <TouchableOpacity
     onPress={handlePickVideo} // ✅ 영상 선택 트리거
     style={[
       styles.videoContainer,
       {
         width: width * 0.8,
         height: (width * 0.8) * (16 / 9),
       },
     ]}
   >
    {videoLoading ? (
      <ActivityIndicator size="large" color="#51BCB4" />
    ) : videoURI ? (
      <Video
        source={{uri: videoURI}}
        style={{width: '100%', height: '100%'}}
        resizeMode="cover"
        repeat
        muted
      />
    ) : (
      <>
        <Icon name="upload" size={40} color="#51BCB4" style={{marginBottom: 20}} />
        <Text style={styles.videoText}>동영상 파일 업로드</Text>
      </>
    )}

   </TouchableOpacity>

<Animated.View style={{ transform: [{ translateX: shakeTitle }] }}>
  <TextInput
    style={[styles.input, { width: width * 0.9 }]}
    placeholder={titleError ? '제목을 입력해주세요.' : '제목'}
    placeholderTextColor={titleError ? 'red' : '#999'}
    value={title}
    onChangeText={text => {
      setTitle(text);
      if (titleError) setTitleError('');
    }}
  />
</Animated.View>

<Animated.View style={{ transform: [{ translateX: shakeTags }] }}>
  <TextInput
    style={[styles.input, styles.inputMultiline, { width: width * 0.9 }]}
    placeholder={tagsError ? '태그를 입력해주세요.' : '태그 입력 ex) #AI, #GPT'}
    placeholderTextColor={tagsError ? 'red' : '#999'}
    value={tags}
    onChangeText={text => {
      handleTagInput(text);
      if (tagsError) setTagsError('');
    }}
    multiline
  />
</Animated.View>



        </View>

      <View style={[styles.buttonContainer, {width: width * 0.9, marginBottom: insets.bottom + 10}]}>
        <CommonButton title="YouTube 업로드" onPress={uploadToYouTube} type="secondary" style={{width: width * 0.4}} />
    <CommonButton
          title="AIVIDEO 업로드"
          onPress={handleUpload}
          type="primary"
          style={{width: width * 0.4}}
        />
      </View>

      {uploading && (
        <View style={{marginTop: 10, alignItems: 'center'}}>
        <Progress.Bar
          progress={uploadProgress / 100}
          width={width * 0.8}
          color="#51BCB4"
          borderColor="#ccc"
        />
        <Text style={{ marginTop: 5, color: '#51BCB4' }}>
          {uploadProgress}% 업로드 중...
        </Text>

        </View>
      )}

      </View>
    </SafeAreaView>
  );
};

export default URLPosting;