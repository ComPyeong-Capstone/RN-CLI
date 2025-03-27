import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../styles/colors'; // 🎨 색상 파일 가져오기

const { width } = Dimensions.get('window');
const IMAGE_WIDTH = width * 0.7;
const IMAGE_HEIGHT = IMAGE_WIDTH * (16 / 9);

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },

  wrapper: {},

  slide: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.imagebox,
    marginHorizontal: (width - IMAGE_WIDTH) / 2,
    marginTop: 30,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  addButton: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },

  addButtonText: {
    fontSize: 28,
    color: '#00A6FB',
    fontWeight: 'bold',
  },

  promptInput: {
    width: width * 0.8,
    height: 40,
    borderColor: '#00A6FB',
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginTop: 40,
    fontSize: 16,
    color: '#1F2C3D',
  },

  buttonContainer: {
    flexDirection: 'row',
    marginTop: 80,
    gap: 90,
  },
});
