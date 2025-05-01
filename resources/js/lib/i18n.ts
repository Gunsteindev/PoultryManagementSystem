import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend"; // Load translations dynamically
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(HttpApi) // Load translations from backend files
    .use(LanguageDetector) // Detect browser language
    .use(initReactI18next) // Bind React-i18next
    .init({
        supportedLngs: ["en", "fr", "de"], // Add your supported languages
        fallbackLng: "en",
        debug: true,
        detection: {
            order: ["localStorage", "cookie", "navigator"],
            caches: ["localStorage", "cookie"],
        },
        backend: {
        loadPath: "/locales/{{lng}}/translation.json", // Load translation files dynamically
        },
    });

console.log("i18n Initialized:", i18n.language); // 

export default i18n;
