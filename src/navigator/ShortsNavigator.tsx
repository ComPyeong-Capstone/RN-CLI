import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// ✅ Screens
import SelectDurationScreen from '../screens/common/SelectDurationScreen';
import PromptInputScreen from '../screens/shorts/31-PromptInputScreen';
import ImageSelectionScreen from '../screens/shorts/32-ImageSelectionScreen';
import SubtitlesSettingScreen from '../screens/common/SubtitlesSettingScreen';
import EffectPreviewScreen from '../screens/common/EffectPreviewScreen';
import MusicSelectionScreen from '../screens/common/MusicSelectionScreen';
import FinalVideoScreen from '../screens/common/FinalVideoScreen';
import ResultScreen from '../screens/common/ResultScreen';
import URLPosting from '../screens/common/URLPosting';

// ✅ Stack Param 타입 정의
export type ShortsStackParamList = {
  SelectDurationScreen: {
    mode: 'shorts' | 'photo';
  };
  PromptInputScreen: {
    duration: number;
  };
  ImageSelectionScreen: {
    duration: number;
    prompt: string;
    imageUrls: string[];
    subtitles: string[];
    videos?: string[];
  };
  SubtitlesSettingScreen: {
    videos: string[];
    subtitles: string[];
    imageUrls: string[];
    music: string;
    previewImage: string;
  };
  EffectPreviewScreen: {
    videos: string[];
    subtitles: string[];
    imageUrls: string[];
    music: string;
    font_path: string;
    font_family: string;
    font_color: string;
    subtitle_y_position: 'bottom' | 'center';
  };
  MusicSelectionScreen: {
    duration: number;
    prompt: string;
    imageUrls: string[];
    subtitles: string[];
    music?: string;
    musicTitle?: string;
    videos?: string[];
    previewImage?: string; // ✅ 추가: 음악 설정 시 previewImage 유지
  };
  FinalVideoScreen: {
    from?: 'photo' | 'shorts';
    duration: number;
    prompt: string;
    imageUrls: string[];
    subtitles: string[];
    music?: string;
    musicTitle?: string;
    videos?: string[];
    previewImage: string;
  };
  ResultScreen: {
    videos: string[];
    subtitles: string[];
    imageUrls: string[];
    music?: string;
  };
  URLPosting: {imageUrls: string[]};
};

// ✅ Stack Navigator 생성
const Stack = createStackNavigator<ShortsStackParamList>();

const ShortsNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="SelectDurationScreen"
        component={SelectDurationScreen}
      />
      <Stack.Screen name="PromptInputScreen" component={PromptInputScreen} />
      <Stack.Screen
        name="ImageSelectionScreen"
        component={ImageSelectionScreen}
      />
      <Stack.Screen
        name="SubtitlesSettingScreen"
        component={SubtitlesSettingScreen}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      />
      <Stack.Screen
        name="EffectPreviewScreen"
        component={EffectPreviewScreen}
      />
      <Stack.Screen
        name="MusicSelectionScreen"
        component={MusicSelectionScreen}
      />
      <Stack.Screen name="FinalVideoScreen" component={FinalVideoScreen} />
      <Stack.Screen name="ResultScreen" component={ResultScreen} />
      <Stack.Screen name="URLPosting" component={URLPosting} />
    </Stack.Navigator>
  );
};

export default ShortsNavigator;
