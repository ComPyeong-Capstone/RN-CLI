import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { styles } from '../../styles/shorts/imageSelectionStyles';
import { scaleSize, scaleFont } from '../../styles/responsive';
import { COLORS } from '../../styles/colors';
import CustomButton from '../../styles/Button';

const { width } = Dimensions.get('window');
const IMAGE_WIDTH = width * 0.7;
const IMAGE_HEIGHT = IMAGE_WIDTH * (16 / 9);

type RootStackParamList = {
  ImageSelectionScreen: undefined;
  FinalVideoScreen: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'ImageSelectionScreen'>;

const ImageSelectionScreen: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const images = ['사진', '사진', '사진', '사진 2', '사진 3'];
  const [selectedImage, setSelectedImage] = useState(2);

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ 진행바 */}
      <View style={[styles.progressContainer, { top: insets.top + scaleSize(40) }]}>
        <Text style={[styles.progressDotInactive, { fontSize: scaleFont(18) }]}>○</Text>
        <View style={styles.progressLine} />
        <Text style={[styles.progressDotInactive, { fontSize: scaleFont(18) }]}>○</Text>
        <View style={styles.progressLine} />
        <Text style={[styles.progressDotActive, { fontSize: scaleFont(18) }]}>●</Text>
        <View style={styles.progressLine} />
        <Text style={[styles.progressDotInactive, { fontSize: scaleFont(18) }]}>○</Text>
      </View>

      {/* ✅ Swiper 슬라이더 */}
      <View style={{ height: IMAGE_HEIGHT + 30, marginTop: 60 }}>
        <Swiper
          key={images.length}
          loop={false}
          showsButtons={false}
          activeDotColor="#00A6FB"
          dotColor="#D9D9D9"
          paginationStyle={{ bottom: -10 }}
          onIndexChanged={(index) => setSelectedImage(index)}
          containerStyle={{ width: width, alignSelf: 'center' }}
        >
          {images.map((item, index) => (
            <View
              key={index}
              style={{
                width: IMAGE_WIDTH,
                height: IMAGE_HEIGHT,
                marginHorizontal: (width - IMAGE_WIDTH) / 2,
                backgroundColor: COLORS.imagebox,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ fontSize: 18 }}>{item}</Text>
            </View>
          ))}
        </Swiper>
      </View>

      {/* ✅ 선택된 이미지의 자막 표시 */}
      <View style={styles.captionBox}>
        <Text style={styles.captionText}>생성된 자막</Text>
      </View>
 <View style={styles.buttonContainer}>
   <CustomButton
     title="이전"
     onPress={() => navigation.goBack()}
     type="secondary"
     style={{ marginHorizontal: 8 }}
   />
   <CustomButton
     title="영상 생성"
     onPress={() => navigation.navigate('FinalVideoScreen')}
     type="primary"
     style={{ marginHorizontal: 8 }}
   />
 </View>
    </SafeAreaView>
  );
};

export default ImageSelectionScreen;
