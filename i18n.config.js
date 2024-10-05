import { languages } from './locales/locales.js';
const messages = Object.assign(languages);

export default defineI18nConfig(async () =>{
    return {
        legacy: false,
        messages: messages,
        locale: 'en'
    }
});