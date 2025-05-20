import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';
import {styles} from '../../styles/common/resultScreenStyles';
import {scaleSize} from '../../styles/responsive';
import {StackNavigationProp} from '@react-navigation/stack';
import CameraRoll from '@react-native-camera-roll/camera-roll';
import RNFS from 'react-native-fs';
import {useUser} from '../../context/UserContext'; // 사용자 토큰용
import {createPostWithUrl} from '../../api/postApi';

// ▶️ Stack Param Type
type ShortsStackParamList = {
  ResultScreen: {videos: string[]; subtitles: string[]; music?: string};
  URLPosting: {finalVideoUrl: string};
  Main: undefined;
};

type NavigationProps = StackNavigationProp<
  ShortsStackParamList,
  'ResultScreen'
>;

const ResultScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  const { user } = useUser(); // 🔥 필수: 유저 정보 가져오기

  const {videos} = route.params as {
    videos: string[];
    subtitles: string[];
    music?: string;
  };

  const rawUrl = videos?.[0];
  const finalVideoUrl = rawUrl?.includes(':8000')
    ? rawUrl
    : rawUrl?.replace('http://3.35.182.180', 'http://3.35.182.180:8000');

  useEffect(() => {
    console.log('🎥 비디오 원본 URL:', rawUrl);
    console.log('🎉 재사용 URL:', finalVideoUrl);
  }, [rawUrl, finalVideoUrl]);

  const handleExit = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Main'}],
    });
  };

  const handleSave = async () => {
    if (!finalVideoUrl) {
      Alert.alert('에러', '저장할 영상이 없습니다.');
      return;
    }

    try {
      if (Platform.OS === 'android') {
        console.log('📱 Android 권한 요청 중...');
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);

        const hasPermission =
          granted['android.permission.READ_MEDIA_VIDEO'] ===
            PermissionsAndroid.RESULTS.GRANTED ||
          granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED;

        if (!hasPermission) {
          Alert.alert('권한 거부', '저장을 위해 권한이 필요합니다.');
          return;
        }
        console.log('✅ 권한 허용됨');
      }

      const fileName = `video_${Date.now()}.mp4`;
      const localPath =
        Platform.OS === 'android'
          ? `${RNFS.CachesDirectoryPath}/${fileName}`
          : `${RNFS.TemporaryDirectoryPath}${fileName}`;

      console.log('📥 다운로드 시작:', finalVideoUrl);
      const downloadResult = await RNFS.downloadFile({
        fromUrl: finalVideoUrl,
        toFile: localPath,
      }).promise;

      if (downloadResult.statusCode !== 200) {
        throw new Error(`다운로드 실패: ${downloadResult.statusCode}`);
      }

      console.log('✅ 다운로드 성공:', localPath);
      console.log('💾 갤러리 저장 시작...');

      // CameraRoll 객체 로그 확인
      console.log('📸 CameraRoll:', CameraRoll);
      console.log('📸 CameraRoll.save:', (CameraRoll as any).save);

      await (CameraRoll as any).save(localPath, {type: 'video'});

      console.log('✅ 갤러리 저장 성공');
      Alert.alert('✅ 저장 완료', '영상이 갤러리에 저장되었습니다.');
    } catch (err) {
      console.error('❌ 저장 실패:', err);
      Alert.alert('에러', '영상 저장 중 문제가 발생했습니다.');
    }
  };


const handlePost = () => {
  if (!finalVideoUrl) {
    Alert.alert('에러', '게시할 영상이 없습니다.');
    return;
  }

  console.log('🚀 포스팅 화면으로 이동:', finalVideoUrl);
  navigation.navigate('URLPosting', { finalVideoUrl });
};


  return (
    <View style={styles.container}>
      {/* ▶️ 비디오 미리보기 */}
      <View style={styles.videoBox}>
        {finalVideoUrl ? (
          <Video
            source={{uri: finalVideoUrl}}
            style={styles.video}
            resizeMode="contain"
            controls
            repeat
            paused={false}
            onLoad={data => console.log('✅ 비디오 로드 성공:', data)}
            onError={err => console.error('❌ 비디오 로드 실패:', err)}
            onBuffer={info => console.log('⏳ 버퍼링 중:', info)}
          />
        ) : (
          <Text style={styles.errorText}>영상이 없습니다.</Text>
        )}
      </View>

      {/* ▶️ 버튼 영역 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Icon
            name="cloud-upload-outline"
            size={scaleSize(24)}
            color="white"
          />
          <Text style={styles.buttonText}>포스팅</Text>
        </TouchableOpacity>

        <View style={styles.smallButtonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <View style={styles.iconWithText}>
              <Icon name="save-outline" size={18} color="#fff" />
              <Text style={styles.smallButtonText}>저장</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
            <Text style={styles.smallButtonText}>나가기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ResultScreen;
