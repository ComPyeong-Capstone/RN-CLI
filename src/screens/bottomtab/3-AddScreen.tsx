import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BlurView} from '@react-native-community/blur';
import {styles} from '../../styles/bottomtab/3-addScreenStyles';
import {scaleSize, scaleFont} from '../../styles/responsive';

// 정확한 RootStackParamList 정의 (중첩 네비게이션 포함)
type RootStackParamList = {
  ShortsStack: {
    screen: 'SelectDurationScreen';
    params: {mode: 'shorts'};
  };
  PhotoStack: {
    screen: 'SelectDurationScreen';
    params: {mode: 'photo'};
  };
  FilePosting: undefined; // ✅ 단일 화면으로 정의
};

type AddScreenModalProps = {
  visible: boolean;
  onClose: () => void;
};

const AddScreenModal: React.FC<AddScreenModalProps> = ({visible, onClose}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: visible ? 1 : 0,
        duration: visible ? 300 : 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: visible ? 0 : 100,
        duration: visible ? 300 : 200,
        useNativeDriver: true,
      }),
    ]).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const handleNavigate = (type: 'shorts' | 'photo' | 'FilePosting') => {
    switch (type) {
      case 'shorts':
        navigation.navigate('ShortsStack', {
          screen: 'SelectDurationScreen',
          params: {mode: 'shorts'},
        });
        break;
      case 'photo':
        navigation.navigate('PhotoStack', {
          screen: 'SelectDurationScreen',
          params: {mode: 'photo'},
        });
        break;
      case 'FilePosting':
navigation.navigate('FilePosting', {
  finalVideoUrl: null,
  title: '',
  tags: '',
});
        break;
    }
    onClose();
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <BlurView
            style={styles.blurBackground}
            blurType="dark"
            blurAmount={10}
          />
          <Animated.View
            style={[
              styles.modalContent,
              {
                opacity: opacityAnim,
                transform: [{translateY: translateYAnim}],
              },
            ]}>
            <TouchableOpacity
              style={[
                styles.button,
                {height: scaleSize(60), marginBottom: scaleSize(15)},
              ]}
              onPress={() => handleNavigate('shorts')}>
              <Text style={[styles.buttonText, {fontSize: scaleFont(18)}]}>
                쇼츠용 영상
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                {height: scaleSize(60), marginBottom: scaleSize(15)},
              ]}
              onPress={() => handleNavigate('photo')}>
              <Text style={[styles.buttonText, {fontSize: scaleFont(18)}]}>
                내 사진 영상
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, {height: scaleSize(60)}]}
              onPress={() => handleNavigate('FilePosting')}>
              <Text style={[styles.buttonText, {fontSize: scaleFont(18)}]}>
                영상 업로드
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddScreenModal;
