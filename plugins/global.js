const log = console.log;
import OS from '~/classes/core/os.js';

export default defineNuxtPlugin(() => {
    window.os = new OS();
});