import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ResultScreen from '../screens/common/ResultScreen';
import SelectDurationScreen from '../screens/common/SelectDurationScreen';
import PhotoPromptScreen from '../screens/photo/PhotoPromptScreen';
import FinalVideoScreen from '../screens/common/FinalVideoScreen';
import MusicSelectionScreen from '../screens/common/MusicSelectionScreen';
import URLPosting from '../screens/common/URLPosting';

// ✅ Stack Navigator 타입 정의
export type PhotoStackParamList = {
  SelectDurationScreen: {mode: 'photo'};
  PhotoPromptScreen: {duration: number};
  FinalVideoScreen: {
    from?: 'photo';
    prompt: string;
    images: {id: string; uri: string | null}[];
    videos?: string[];
    subtitles?: string[];
    music?: string;
    musicTitle?: string;
  };
  MusicSelectionScreen: {
    prompt: string;
    images: {id: string; uri: string | null}[];
    music?: string;
    musicTitle?: string;
    videos?: string[];
  };
  ResultScreen: {
    finalVideoUrl: string;
  };
  PostVideoScreen: {
    finalVideoUrl: string; // ✅ 최종 영상 URL 넘김
  };
};

// ✅ Stack Navigator 생성
const Stack = createStackNavigator<PhotoStackParamList>();

const PhotoNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="SelectDurationScreen"
        component={SelectDurationScreen}
      />
      <Stack.Screen name="PhotoPromptScreen" component={PhotoPromptScreen} />
      <Stack.Screen name="FinalVideoScreen" component={FinalVideoScreen} />
      <Stack.Screen
        name="MusicSelectionScreen"
        component={MusicSelectionScreen}
      />
      <Stack.Screen name="ResultScreen" component={ResultScreen} />
      <Stack.Screen name="URLPosting" component={URLPosting} />
    </Stack.Navigator>
  );
};

export default PhotoNavigator;
