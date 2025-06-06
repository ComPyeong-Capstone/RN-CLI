// src/styles/auth/AuthScreenStyles.ts
import {StyleSheet} from 'react-native';
import {scaleFont, scaleSize} from '../responsive';
import {COLORS} from '../../styles/colors'; // 🎨 색상 파일 가져오기

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scaleSize(20),
  },
  title: {
    fontSize: scaleFont(28),
    fontWeight: 'bold',
    marginBottom: scaleSize(30),
  },
  input: {
    width: '90%',
    backgroundColor: '#fff',
    padding: scaleSize(15),
    borderRadius: scaleSize(8),
    marginBottom: scaleSize(20),
    borderWidth: 1,
    borderColor: '#ccc',

  },
  button: {
    backgroundColor: '#51BCB4',
    padding: scaleSize(15),
    borderRadius: scaleSize(8),
    width: '90%',
    alignItems: 'center',
    marginTop: scaleSize(10),
  },
  buttonText: {
    color: '#fff',
    fontSize: scaleFont(16),
    fontWeight: 'bold',
  },
  switchText: {
    color: '#ccc',
    marginTop: scaleSize(20),
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginVertical: scaleSize(20),
    justifyContent: 'center',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: scaleSize(10),
    color: '#999',
    fontSize: scaleFont(14),
  },
  // 🔹 구글 버튼
  googleButton: {
    backgroundColor: COLORS.textPrimary,
    padding: scaleSize(15),
    borderRadius: scaleSize(8),
    width: '90%',
    alignItems: 'center',
    marginTop: scaleSize(10),
  },
  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIcon: {
    marginRight: scaleSize(10),
  },
  // 🔹 카카오 버튼
  kakaoButton: {
    backgroundColor: '#FEE500',
    padding: scaleSize(15),
    borderRadius: scaleSize(8),
    width: '90%',
    alignItems: 'center',
    marginTop: scaleSize(10),
  },
  kakaoButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kakaoIcon: {
    marginRight: scaleSize(10),
  },
  kakaoButtonText: {
    color: '#000',
    fontSize: scaleFont(16),
    fontWeight: 'bold',
  },
});
