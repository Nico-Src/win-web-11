const log = console.log;
import OS from '~/classes/core/os.js';

export default defineNuxtPlugin(() => {
    return {
        provide: {
            langs: [
                {key: 'de', name: 'German', src: '/img/flags/germany.png', locale: 'de'},
                {key: 'en', name: 'English', src: '/img/flags/united-kingdom.png', locale: 'en-US'},
            ]
        }
    }
});