import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { COLORS } from '../styles/colors'; // 🎨 색상 파일 가져오기

// ✅ Shorts Screens 추가
import PromptInputScreen from '../screens/shorts/3210-PromptInputScreen';
import ImageSelectionScreen from '../screens/shorts/3220-ImageSelectionScreen';
import FinalVideoScreen from '../screens/shorts/3230-FinalVideoScreen';
import MusicSelectionScreen from '../screens/shorts/3231-MusicSelectionScreen';
import ResultScreen from '../screens/shorts/3240-ResultScreen';

// ✅ Stack Navigator 타입 정의
type ShortsStackParamList = {
  PromptInputScreen: undefined;
  ImageSelectionScreen: undefined;
  FinalVideoScreen: undefined;
  MusicSelectionScreen: undefined;
  PostVideoScreen: undefined;
  ResultScreen: undefined;
};

// ✅ Stack Navigator 생성
const Stack = createStackNavigator<ShortsStackParamList>();

const ShortsNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="PromptInputScreen" component={PromptInputScreen} />
      <Stack.Screen
        name="ImageSelectionScreen"
        component={ImageSelectionScreen}
      />
      <Stack.Screen name="FinalVideoScreen" component={FinalVideoScreen} />
      <Stack.Screen
        name="MusicSelectionScreen"
        component={MusicSelectionScreen}
      />
      <Stack.Screen name="ResultScreen" component={ResultScreen} />
    </Stack.Navigator>
  );
};

export default ShortsNavigator;
