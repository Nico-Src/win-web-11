const log = console.log;
import OS from '~/classes/core/os.js';

export default defineNuxtPlugin(() => {
    return {
        provide: {
            langs: [
                {key: 'de', locale: 'de'},
                {key: 'en', locale: 'en-US'},
                {key: 'ru', locale: 'ru'}
            ]
        }
    }
});