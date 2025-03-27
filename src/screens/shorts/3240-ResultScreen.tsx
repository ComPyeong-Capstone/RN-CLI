import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from '../../styles/shorts/ResultScreenStyles'; // ✅ 스타일 가져오기
import {scaleSize} from '../../styles/responsive'; // ✅ 반응형 크기 조정 함수 가져오기
import {StackNavigationProp} from '@react-navigation/stack';
import { COLORS } from '../../styles/colors'; // 🎨 색상 파일 가져오기
import CustomButton from '../../styles/Button';

// 📌 네비게이션 타입 정의
type RootStackParamList = {
  ResultScreen: undefined;
  Main: undefined;
};

type NavigationProps = StackNavigationProp<RootStackParamList, 'ResultScreen'>;

const ResultScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  const handleExit = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Main'}],
    });
  };

  return (
    <View style={styles.container}>
      {/* 📌 중앙 네모 박스 (결과물) */}
      <View style={styles.resultBox}>
        <Text style={styles.resultText}>최종 결과물</Text>
      </View>

      {/* 📌 버튼 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.postButton}>
          <Icon
            name="cloud-upload-outline"
            size={scaleSize(24)}
            color="white"
          />
          <Text style={styles.buttonText}>포스팅</Text>
        </TouchableOpacity>

        <View style={styles.smallButtonContainer}>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.smallButtonText}>저장</Text>
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
