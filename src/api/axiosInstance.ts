//axiosInstance.ts
import axios from 'axios';
import {
  getAccessToken,
  getRefreshToken,
  saveAuthTokens,
  clearAuthTokens,
} from '../utils/storage';import {BASE_URL} from '@env';

// ✅ 환경변수 확인
console.log('🧪 BASE_URL from .env:', BASE_URL);

// ✅ 기본 API (8080 포트)
const axiosInstance = axios.create({
  baseURL: `${BASE_URL}${BASE_URL.endsWith(':8080') ? '' : ':8080'}`,
  timeout: 600000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ 영상 생성 API (8000 포트)
export const videoAxiosInstance = axios.create({
  baseURL: `${BASE_URL}${BASE_URL.endsWith(':8000') ? '' : ':8000'}`,
  timeout: 600000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ 요청 인터셉터 (공통)
const attachInterceptors = (instance: typeof axiosInstance) => {
  instance.interceptors.request.use(
    async config => {
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // 요청 로그
      console.group('📤 [Axios Request]');
      console.log('➡️ URL:', `${config.baseURL}${config.url}`);
      console.log('➡️ Method:', config.method?.toUpperCase());
      console.log('🧾 Headers:', config.headers);
      if (config.data) console.log('📦 Body:', config.data);
      console.groupEnd();

      return config;
    },
    error => {
      console.error('❌ 요청 인터셉터 에러:', error);
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    response => {
      console.group('📥 [Axios Response]');
      console.log('✅ Status:', response.status);
      console.log('✅ URL:', response.config.url);
      console.log('📄 Response Data:', response.data);
      console.groupEnd();
      return response;
    },
    async error => {
      const status = error?.response?.status;
      const url = error?.config?.url;

      console.group('❌ [Axios Error]');
      console.log('🔴 Status:', status);
      console.log('🔴 URL:', url);
      console.log('🧾 Error Response:', error?.response?.data);
      console.groupEnd();

      if (status === 401) {
        await clearAuthTokens();
        console.warn('🔒 토큰 만료 → 로그아웃 처리됨');
      }

      return Promise.reject(error);
    },
  );
};
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
// ✅ 인터셉터 각각 적용
attachInterceptors(axiosInstance);
attachInterceptors(videoAxiosInstance);

export default axiosInstance;
