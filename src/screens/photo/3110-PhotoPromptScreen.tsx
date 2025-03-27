import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import { launchImageLibrary } from 'react-native-image-picker';
import styles from '../../styles/photo/PhotoPromptStyles'; // ✅ 스타일 import

const { width } = Dimensions.get('window');
const IMAGE_WIDTH = width * 0.7; // 살짝 보이도록 크기 줄이기
const IMAGE_HEIGHT = IMAGE_WIDTH * (16 / 9); // 16:9 비율 적용
import { COLORS } from '../../styles/colors'; // 🎨 색상 파일 가져오기
import CustomButton from '../../styles/Button';

const PhotoPromptScreen = ({ navigation }) => {
  const [images, setImages] = useState([
    { id: 'add', uri: null }, // 첫 번째 슬라이드는 항상 + 버튼
  ]);
const [prompt, setPrompt] = useState('');

  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 1920,
      maxHeight: 1080,
      quality: 1,
      includeBase64: false,
      aspect: [9, 16], // 📌 업로드 시 강제 크롭
    };

    launchImageLibrary(options, (response) => {
      if (!response.didCancel && !response.error) {
        setImages((prevImages) => [
          ...prevImages.filter(img => img.id !== 'add'),
          { id: String(Date.now()), uri: response.assets[0].uri },
          { id: 'add', uri: null }, // 마지막에는 항상 + 버튼 유지
        ]);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ Swiper 이미지 슬라이더 */}

  <Swiper
    key={images.length}
    style={styles.wrapper}
    showsButtons={false}
    loop={false}
    activeDotColor="#00A6FB"
    dotColor="#D9D9D9"
    paginationStyle={{ bottom: 10 }}
    containerStyle={{ width: width, alignSelf: 'center' }}
  >
    {images.map((item) => (
      <View key={item.id} style={[styles.slide]}>
        {item.uri ? (
          <Image source={{ uri: item.uri }} style={styles.image} resizeMode="cover" />
        ) : (
          <TouchableOpacity style={styles.addButton} onPress={pickImage}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        )}
      </View>
    ))}
  </Swiper>

  <TextInput
    style={styles.promptInput}
    placeholder="프롬프트를 입력하세요"
    placeholderTextColor="#aaa"
    value={prompt}
    onChangeText={setPrompt}
  />

      {/* ✅ 버튼 컨트롤 */}
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

export default PhotoPromptScreen;
