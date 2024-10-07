<script setup>
const route = useRoute();
const router = useRouter();
const snackbar = useSnackbar();
const i18n = useI18n();
const app = useNuxtApp();

import Utils from "~/classes/utils.js";

const darkMode = ref(false);

// taskbar variables
const taskbar = ref({tasks: []});
const taskbarEl = ref(null);
// language select variables
const language = ref(app.$langs.find(l => l.key === localStorage.getItem('win-language') || 'en'));
const languageSelect = ref(null);
// windows hub variables
const showWindowsHub = ref(false);
const windowsHub = ref(null);
const windowsHubSearch = ref('');
// start screen variables
const startingUp = ref(true);
const showStartUp = ref(true);
// lock screen variables
const signedIn = ref(false);

function taskDown(event){
    const target = event.target;
    target.classList.add('clicked');
}

function taskUp(event){
    const target = event.target;
    target.classList.remove('clicked');
}

const taskClick = (action) => { if(action) eval(action); }

function toggleWindowsHub(force){
    if(force === undefined) showWindowsHub.value = !showWindowsHub.value;
    else showWindowsHub.value = force;
    if(!showWindowsHub.value) windowsHubSearch.value = '';
}

function selectLocale(e){
    i18n.setLocale(e.key);
    // save to local storage
    localStorage.setItem('win-language',e.key);
    // unfocus input
    languageSelect.value.blur();
}

useSeoMeta({
    // wrap title in computed function so title gets updated correctly
    title: () => 'Windows 11',
});

// load the default tasks for the taskbar (windows, search, edge, ...)
function loadDefaultTasks(){
    const jsonPath = '/data/defaultTasks.json';
    fetch(jsonPath).then(res => res.json()).then(json => {
        let offset = 0;
        for(const task of json){
            task.id = Utils.generateUUID();
            setTimeout(() => {
                taskbar.value.tasks.push(task);
            }, 350 * offset);
            offset++;
        }
    });
}

window.onclick = (e) => {
    if(!windowsHub.value.el.contains(e.target) && windowsHub.value.el !== e.target && e.target.getAttribute('data-name') !== 'windows'){
        toggleWindowsHub(false);
    }
}

onMounted(()=>{
    setTimeout(()=>{
        startingUp.value = false;
        setTimeout(()=>{
            showStartUp.value = false;
            loadDefaultTasks();
        }, 1000);
    }, 100); // 2500
});
</script>
<template>
    <div :class="{bg: true, 'dark-theme': darkMode}" ref="scrollEl">
        <StartupScreen :show="showStartUp" :show-loader="startingUp"></StartupScreen>
        <LockScreen :signed-in="signedIn" :hide-startup="startingUp"></LockScreen>
        <div class="bg-wrapper">
            <img :class="{hide: darkMode}" src="/wallpaper/light.jpg">
            <img :class="{hide: !darkMode}" src="/wallpaper/dark.jpg">
        </div>
        <Taskbar :dark-mode="darkMode" :tasks="taskbar.tasks" :task-down="taskDown" :task-up="taskUp" :task-click="taskClick" ref="taskbarEl"></Taskbar>
        <q-select ref="languageSelect" square class="language-select" @update:model-value="selectLocale" filled v-model="language" :options="$langs" :label="$t('language')" color="dark" :transition-duration="150" :popup-content-class="`${darkMode ? 'dark' : ''} language-select-popup`">
            <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                    <q-item-section>
                        <q-item-label>{{ $t(`language.${scope.opt.key}`) }}</q-item-label>
                    </q-item-section>
                </q-item>
            </template>
            <template v-slot:selected>
                <q-item style="padding: 5px 0px 0px 0px; min-height: 0px;" :key="language.src">
                    <q-item-section>
                        <q-item-label>{{ $t(`language.${language?.key}`) }}</q-item-label>
                    </q-item-section>
                </q-item>
            </template>
        </q-select>
        <div id="theme-toggle" @click="darkMode = !darkMode">
            <Icon :name="darkMode ? 'material-symbols:dark-mode' : 'material-symbols:light-mode'" size="22px"/>
        </div>
        <WindowsHub :show="showWindowsHub" :search="windowsHubSearch" :dark-mode="darkMode" ref="windowsHub"></WindowsHub>
    </div>
</template>
<style scoped>
.bg{
    width: 100%;
    height: 100%;
    padding: 30px 50px 30px 50px;
    overflow: hidden;
    user-select: none;
}

.dark-theme{
    #theme-toggle{background-color: rgba(var(--dark-bg), .66); color: white;}
    #theme-toggle:hover{background-color: rgba(var(--dark-bg-2), .66) !important;}
    .language-select{background-color: rgba(var(--dark-bg), .66);}
}

.bg-wrapper{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow: hidden;
    z-index: -1;
}

.bg-wrapper img{
    position: absolute;
    width: 100%;
    height: calc(100% + 150px);
    top: 0;
    left: 0;
    object-fit: cover;
    opacity: 1;
    transition: opacity var(--transition-duration) ease;

    &.hide{
        opacity: 0;
    }
}

#theme-toggle{
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 2;
    cursor: pointer;
    width: 50px;
    aspect-ratio: 1;
    border-radius: 4px;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(var(--light-bg),0.66);
    transition: background-color var(--transition-duration) ease, color var(--transition-duration) ease;

    &:hover{
        background-color: white;
    }
}

.language-select{
    position: absolute;
    top: 70px;
    right: 10px;
    min-width: 150px;
    border-radius: 4px;
    background-color: rgba(var(--light-bg),0.66);
    transition: background-color var(--transition-duration) ease;
}
</style>
<style>
.dark-theme{
    .language-select{
        .q-icon{color: #aaa;}
        .q-item{color: white !important;}
        .q-field__label{color: #aaa !important;}
    }
    .language-select.q-field--filled .q-field__control:before{background-color: rgba(var(--dark-bg-2),0.66) !important;}
}

.language-select{
    .q-icon{color: #505050;}
    .q-item{color: black;}
    .q-field__label{color: #505050;}
}

.language-select.q-field--filled .q-field__control:before{
    background-color: rgba(var(--light-bg),0.66);
    border-radius: 4px !important;
    border-bottom: none !important;
}

.language-select.q-field--filled .q-field__control:after{
    display: none !important;
}

.language-select-popup{
    background-color: rgba(var(--light-bg),0.66) !important;
    border-radius: 4px !important;
    transform: translateY(5px) !important;
    backdrop-filter: blur(var(--blur-radius)) !important;

    .q-item.q-manual-focusable--focused{
        background-color: rgba(var(--light-bg), .66) !important;
    }

    &.dark{
        background-color: rgba(var(--dark-bg),0.66) !important;

        .q-item.q-manual-focusable--focused{
            background-color: rgba(var(--dark-bg), .66) !important;
        }
    }
}

.language-select-popup .q-focus-helper{background: transparent !important;}
.language-select-popup .q-item__label{color: black !important;}
.language-select-popup.dark .q-item__label{color: white !important;}
</style>