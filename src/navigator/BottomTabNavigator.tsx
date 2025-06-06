import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/bottomtab/1-HomeScreen';
import SearchScreen from '../screens/bottomtab/2-SearchScreen';
import AddScreenModal from '../screens/bottomtab/3-AddScreen';
import NotificationsScreen from '../screens/bottomtab/4-NotificationsScreen';
import ProfileScreen from '../screens/bottomtab/5-ProfileScreen';

import {COLORS} from '../styles/colors';
import {scaleSize} from '../styles/responsive';

// ✅ 여기에 타입 직접 정의 (외부에서 쓸 수 있게 export)
export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
  Add: undefined;
  Notifications: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const getTabBarIcon = (
  routeName: keyof BottomTabParamList,
  focused: boolean,
  color: string,
  size: number,
) => {
  let iconName: string;

  switch (routeName) {
    case 'Home':
      iconName = 'home';
      break;
    case 'Search':
      iconName = 'search';
      break;
    case 'Add':
      iconName = 'add';
      break;
    case 'Notifications':
      iconName = 'notifications';
      break;
    case 'Profile':
      iconName = 'person';
      break;
    default:
      iconName = 'ellipse';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

const AddTabBarButton: React.FC<{onPress: () => void}> = ({onPress}) => (
  <TouchableOpacity style={styles.customButton} onPress={onPress}>
    <View style={styles.innerButton}>
      <Ionicons name="add" size={scaleSize(30)} color="#fff" />
    </View>
  </TouchableOpacity>
);

const BottomTabNavigator: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) =>
          ({
            headerShown: false,
            tabBarIcon: ({color, size, focused}) =>
              getTabBarIcon(
                route.name as keyof BottomTabParamList,
                focused,
                color,
                size,
              ),
            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: '#aaa',
            tabBarStyle: styles.tabBarStyle,
          } as BottomTabNavigationOptions)
        }>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen
          name="Add"
          component={() => <></>}
          options={{
            tabBarButton: () => (
              <AddTabBarButton onPress={() => setModalVisible(true)} />
            ),
          }}
        />
        <Tab.Screen name="Notifications" component={NotificationsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>

      <AddScreenModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  customButton: {
    top: Platform.OS === 'ios' ? -scaleSize(20) : -scaleSize(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleSize(35),
    backgroundColor: '#FFFFFF',
    width: scaleSize(70),
    height: scaleSize(70),
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  innerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: scaleSize(75),
    height: scaleSize(75),
    backgroundColor: COLORS.primary,
    borderRadius: scaleSize(100),
  },
  tabBarStyle: {
    backgroundColor: COLORS.background,
    height: scaleSize(75),
    paddingBottom: Platform.OS === 'ios' ? scaleSize(10) : scaleSize(10),
  },
});

export default BottomTabNavigator;
