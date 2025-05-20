import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import AuthNavigator from './AuthNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import ShortsNavigator from './ShortsNavigator';
import PhotoNavigator from './PhotoNavigator';
import ShortsPlayerScreen from '../screens/shortsPlayer/ShortsPlayerScreen';
import URLPosting from '../screens/common/URLPosting';
import FilePosting from '../screens/common/FilePosting';

import {useUser} from '../context/UserContext';
import {AppStackParamList} from './types';

const Stack = createStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  const {user} = useUser();

  console.log('[AppNavigator] user:', user);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user ? (
          <>
            {/* 메인 탭 네비게이터 */}
            <Stack.Screen name="Main" component={BottomTabNavigator} />

            {/* 숏츠 및 사진 생성 흐름 */}
            <Stack.Screen name="ShortsStack" component={ShortsNavigator} />
            <Stack.Screen name="PhotoStack" component={PhotoNavigator} />

            {/* 동영상 플레이 및 업로드 화면 */}
            <Stack.Screen
              name="ShortsPlayerScreen"
              component={ShortsPlayerScreen}
            />
            <Stack.Screen
              name="URLPosting"
              component={URLPosting}
              initialParams={{
                finalVideoUrl: null,
                title: '',
                tags: '',
              }}
            />

            {/* ✅ 초기 파라미터 설정 */}
            <Stack.Screen
              name="FilePosting"
              component={FilePosting}
              initialParams={{
                finalVideoUrl: null,
                title: '',
                tags: '',
              }}
            />
          </>
        ) : (
          // 로그인/회원가입 흐름
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
