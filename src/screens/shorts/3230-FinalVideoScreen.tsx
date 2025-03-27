import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {StackNavigationProp} from '@react-navigation/stack';
import {ShortsStackParamList} from '../../navigator/ShortsNavigator';
import styles from '../../styles/photo/FinalVideoStyles'; // 스타일 파일 분리
import { COLORS } from '../../styles/colors'; // 🎨 색상 파일 가져오기
import Swiper from 'react-native-swiper';
import CustomButton from '../../styles/Button';

// ✅ 네비게이션 타입 정의
type FinalVideoScreenNavigationProp = StackNavigationProp<
  ShortsStackParamList,
  'FinalVideoScreen'
>;

interface Props {
  navigation: FinalVideoScreenNavigationProp;
}

const FinalVideoScreen: React.FC<Props> = ({navigation}) => {
  const {width, height} = useWindowDimensions();
  const insets = useSafeAreaInsets();
// 기준 너비 설정
const VIDEO_WIDTH = width * 0.6; // 적당한 너비 (화면의 60%)
const VIDEO_HEIGHT = VIDEO_WIDTH * (16 / 9); // 세로가 더 길게: 9:16 비율

  // ✅ 더미 데이터 (생성된 동영상 목록)
  const videos = ['생성된 동영상 1', '생성된 동영상 2', '생성된 동영상 3'];
  const [selectedVideo, setSelectedVideo] = useState<number>(0);
  const translateX = new Animated.Value(0);

  const handleNext = () => {
    if (selectedVideo < videos.length - 1) {
      Animated.timing(translateX, {
        toValue: -width * (selectedVideo + 1),
        duration: 300,
        useNativeDriver: true,
      }).start(() => setSelectedVideo(selectedVideo + 1));
    }
  };

  const handlePrev = () => {
    if (selectedVideo > 0) {
      Animated.timing(translateX, {
        toValue: -width * (selectedVideo - 1),
        duration: 300,
        useNativeDriver: true,
      }).start(() => setSelectedVideo(selectedVideo - 1));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ 최상단 진행 상태 점 */}
      <View style={[styles.progressContainer, {top: insets.top + 10}]}>
        {['○', '●', '○', '○'].map((dot, index) => (
          <React.Fragment key={index}>
            <Text
              style={
                index === 1
                  ? styles.progressDotActive
                  : styles.progressDotInactive
              }>
              {dot}
            </Text>
            {index < 3 && <View style={styles.progressLine} />}
          </React.Fragment>
        ))}
      </View>

      {/* 📌 동영상 슬라이드 */}
      <View
        style={[
          styles.sliderContainer,
    {width: width * 0.9, height: VIDEO_HEIGHT + 40}, // padding 여유 추가
        ]}>
        <TouchableOpacity onPress={handlePrev} style={styles.arrowButton}>
          <Text style={styles.arrowText}>{'<'}</Text>
        </TouchableOpacity>
<View style={{ height: VIDEO_HEIGHT , justifyContent: 'center' }}>
       <Swiper
         loop={false}
         showsButtons={false}
         activeDotColor="#00A6FB"
         dotColor="#D9D9D9"
         paginationStyle={{ bottom: -20 }}
         onIndexChanged={(index) => setSelectedVideo(index)}
         containerStyle={{ width: width, alignSelf: 'center' }}
       >
      {videos.map((item, index) => (
        <View
          key={index}
          style={[
            styles.videoItem,
            {
              width: VIDEO_WIDTH,
              height: VIDEO_HEIGHT,
              marginHorizontal: (width - VIDEO_WIDTH) / 2,
            },
          ]}
        >
          <Text style={styles.videoText}>{item}</Text>
        </View>
      ))}

       </Swiper>
     </View>
        <TouchableOpacity onPress={handleNext} style={styles.arrowButton}>
          <Text style={styles.arrowText}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      {/* 📌 배경 음악 선택 버튼 */}
      <TouchableOpacity
        style={[styles.musicButton, {width: width * 0.7, height: 40}]}
        onPress={() => navigation.navigate('MusicSelectionScreen')}>
        <Text style={styles.buttonText}>배경 음악</Text>
      </TouchableOpacity>

 <View style={styles.buttonContainer}>
   <CustomButton
     title="이전"
     onPress={() => navigation.goBack()}
     type="secondary"
     style={{ marginHorizontal: 8 }}
   />
   <CustomButton
     title="영상 생성"
     onPress={() => navigation.navigate('ResultScreen')}
     type="primary"
     style={{ marginHorizontal: 8 }}
   />
 </View>
    </SafeAreaView>
  );
};

export default FinalVideoScreen;
