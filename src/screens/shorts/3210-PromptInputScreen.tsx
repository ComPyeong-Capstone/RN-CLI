import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {styles} from '../../styles/shorts/prompInputStyles'; // ✅ styles/shorts 폴더의 스타일 파일
import {scaleSize, scaleFont} from '../../styles/responsive'; // ✅ 반응형 크기 조정 함수 가져오기
import { COLORS } from '../../styles/colors'; // 🎨 색상 파일 가져오기
import CustomButton from '../../styles/Button';

// ✅ 네비게이션 타입 정의
type RootStackParamList = {
  PromptInputScreen: undefined;
  ImageSelectionScreen: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'PromptInputScreen'>;

const PromptInputScreen: React.FC<Props> = ({navigation}) => {
  const insets = useSafeAreaInsets(); // ✅ 노치 대응
  const [prompt, setPrompt] = useState<string>('');

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ 최상단 4단계 진행바 (노치 대응) */}
      <View
        style={[styles.progressContainer, {top: insets.top + scaleSize(10)}]}>
        <Text style={[styles.progressDotInactive, {fontSize: scaleFont(18)}]}>
          ○
        </Text>
        <View style={styles.progressLine} />
        <Text style={[styles.progressDotActive, {fontSize: scaleFont(18)}]}>
          ●
        </Text>
        <View style={styles.progressLine} />
        <Text style={[styles.progressDotInactive, {fontSize: scaleFont(18)}]}>
          ○
        </Text>
        <View style={styles.progressLine} />
        <Text style={[styles.progressDotInactive, {fontSize: scaleFont(18)}]}>
          ○
        </Text>
      </View>

      {/* 📌 프롬프트 입력 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, {fontSize: scaleFont(16)}]}
          placeholder="프롬프트 입력"
          placeholderTextColor="#51BCB4"
          multiline
          onChangeText={setPrompt}
          value={prompt}
        />
      </View>
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
     onPress={() => navigation.navigate('ImageSelectionScreen')}
     type="primary"
     style={{ marginHorizontal: 8 }}
   />
 </View>

    </SafeAreaView>
  );
};

export default PromptInputScreen;
