import { Platform } from 'react-native';
import axios from 'axios';

const api = axios.create({
  baseURL: Platform.select({
    ios: 'http://localhost:3000',
    android: 'http://10.0.2.2:3000'
  }),
});

export default api;
