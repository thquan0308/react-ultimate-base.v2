import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
    .use(Backend) // Kết nối với backend
    .use(LanguageDetector) // Tự động phát hiện ngôn ngữ
    .use(initReactI18next) // Load ngôn ngữ từ file JSON bên ngoài (nếu cần)
    .init({
        debug: false,
        fallbackLng: 'en', // Ngôn ngữ mặc định
        interpolation: {
            escapeValue: false // Không cần escape vì React đã xử lý an toàn
        }
    });

export default i18n;