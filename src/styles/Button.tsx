import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS } from '../styles/colors'; // 🎨 프로젝트의 컬러 시스템 사용

interface Props {
  title: string;
  onPress: () => void;
  type?: 'primary' | 'secondary' | 'gray';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const CommonButton: React.FC<Props> = ({ title, onPress, type = 'primary', style, textStyle }) => {
  return (
    <TouchableOpacity
      style={[styles.base, styles[type], style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CommonButton;

const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: '#ccc',
  },
  gray: {
    backgroundColor: '#E5E5E5',
  },
});
