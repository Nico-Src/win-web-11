<script setup>
const route = useRoute();
const router = useRouter();
const snackbar = useSnackbar();
const i18n = useI18n();

import Utils from "~/classes/utils.js";

const availableLanguages = [
    {key: 'de', name: 'German', src: '/img/flags/germany.png'},
    {key: 'en', name: 'English', src: '/img/flags/united-kingdom.png'},
];

const darkMode = ref(false);
const taskbar = ref({tasks: []});
const taskbarEl = ref(null);
const language = ref(availableLanguages.find(l => l.key === ('en')));
const languageSelect = ref(null);
const showWindowsHub = ref(false);
const windowsHub = ref(null);
const windowsHubSearch = ref('');

function taskDown(event){
    const target = event.target;
    target.classList.add('clicked');
}

function taskUp(event){
    const target = event.target;
    target.classList.remove('clicked');
}

function taskClick(action){
    if(action){
        eval(action);
    }
}

function toggleWindowsHub(force){
    if(force === undefined) showWindowsHub.value = !showWindowsHub.value;
    else showWindowsHub.value = force;
    if(!showWindowsHub.value) windowsHubSearch.value = '';
}

function selectLocale(e){
    i18n.setLocale(e.key);
    // save to local storage
    // setItem('language',e.key);
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
    if(!windowsHub.value.contains(e.target) && windowsHub.value !== e.target && e.target.getAttribute('data-name') !== 'windows'){
        toggleWindowsHub(false);
    }
}

onMounted(()=>{
    loadDefaultTasks();
});
</script>
<template>
    <div :class="{bg: true, dark: darkMode}" ref="scrollEl">
        <div class="bg-wrapper">
            <img :class="{hide: darkMode}" src="/wallpaper/light.jpg">
            <img :class="{hide: !darkMode}" src="/wallpaper/dark.jpg">
        </div>
        <TransitionGroup id="taskbar" ref="taskbarEl" tag="div" name="taskbar">
            <div class="taskbar-item" v-for="task in taskbar.tasks" :key="task.id" @mousedown="taskDown($event)" @mouseup="taskUp($event)" @mouseleave="taskUp($event)" @click="taskClick(task.action)" :data-name="task.name">
                <img :src="darkMode ? task.darkIcon : task.icon" :alt="task.name" :width="task.iconSize" :height="task.iconSize" :name="task.name">
                <q-tooltip v-if="!task.hideToolTip" transition-show="fade" transition-hide="fade" :transition-duration="300" :delay="1000" :class="{'taskbar-tooltip': true, dark: darkMode}">
                    {{ $t(task.name) }}
                </q-tooltip>
            </div>
        </TransitionGroup>
        <q-select ref="languageSelect" square class="language-select" @update:model-value="selectLocale" filled v-model="language" :options="availableLanguages" :label="$t('language')" color="dark" :transition-duration="150" :popup-content-class="`${darkMode ? 'dark' : ''} language-select-popup`">
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
        <div id="windows-hub" :class="{hide: !showWindowsHub}" ref="windowsHub">
            <div class="search-wrapper">
                <Icon name="material-symbols:search" size="22px"/>
                <div class="input-wrapper">
                    <input class="input" type="text" v-model="windowsHubSearch">
                    <div :class="{placeholder: true, hide: windowsHubSearch.length > 0}">{{ $t('windows-search-placeholder') }}</div>
                </div>
            </div>
        </div>
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

.dark{
    #taskbar{background-color: rgba(var(--dark-bg), .66); border-color: rgba(var(--dark-bg-2), .66);}
    #taskbar .taskbar-item:hover{background-color: rgba(var(--dark-bg-2), .66) !important;}
    #theme-toggle{background-color: rgba(var(--dark-bg), .66); color: white;}
    #theme-toggle:hover{background-color: rgba(var(--dark-bg-2), .66) !important;}
    .language-select{background-color: rgba(var(--dark-bg), .66);}
    #windows-hub{background-color: rgba(var(--dark-bg), .66); border-color: rgba(var(--dark-bg-2), .66);}
    #windows-hub .search-wrapper{background-color: rgba(var(--dark-bg-2), .66); border-color: rgba(var(--dark-bg-2), .66);}
    #windows-hub .search-wrapper:focus-within{background-color: rgba(var(--dark-bg-2), 1) !important;}
    #windows-hub .search-wrapper .icon{color: #aaa;}
    #windows-hub .search-wrapper .input{color: white;}
}

#taskbar{
    width: 100%;
    height: 50px;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 2;
    background-color: rgba(var(--light-bg),0.66);
    border-top: 1px solid rgba(var(--light-bg),.66);
    backdrop-filter: blur(var(--blur-radius));
    display:flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    transition: background-color var(--transition-duration) ease, border-color var(--transition-duration) ease;

    .taskbar-item{
        width: 40px;
        aspect-ratio: 1;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: background-color var(--transition-duration) ease;

        &:hover{
            background-color: rgba(var(--light-bg), .66);
        }

        &.clicked img{
            transform: scale(0.85);
        }
    }

    .taskbar-item img{
        transition: transform .15s ease;
        will-change: transform;
        pointer-events: none;
    }
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

#windows-hub{
    position: absolute;
    z-index: 1;
    bottom: 70px;
    left: 0; right: 0;
    margin: auto;
    width: 650px;
    height: calc(100% - 100px);
    background-color: rgba(var(--light-bg),0.66);
    border: 1px solid rgba(var(--light-bg),.66);
    border-radius: 4px;
    backdrop-filter: blur(var(--blur-radius));
    transition: background-color var(--transition-duration) ease, transform var(--transition-duration) ease, opacity var(--transition-duration) ease;
    will-change: transform, opacity;
    display:flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    padding: 20px;

    &.hide{
        transform: translateY(100%);
        opacity: 0;
        pointer-events: none;
    }

    .search-wrapper{
        width: 100%;
        height: 30px;
        background-color: rgba(var(--light-bg),0.66);
        border: 1px solid rgba(var(--light-bg),.66);
        border-radius: 15px;
        display:flex;
        justify-content: center;
        align-items: center;
        transition: background-color var(--transition-duration) ease;

        &:focus-within{
            background-color: white;
        }

        .icon{
            margin-left: 10px;
            pointer-events: none;
        }

        .input-wrapper{
            flex: 1;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;

            .placeholder{
                position: absolute;
                left: 10px;
                top: 0;
                bottom: 0;
                margin: auto;
                height: 30px;
                display:flex;
                align-items: center;
                pointer-events: none;
                color: #707070;
                transition: opacity var(--transition-duration) ease;

                &.hide{
                    opacity: 0;
                }
            }

            .input{
                flex: 1;
                height: 100%;
                background-color: transparent;
                outline: none;
                border: none;
                border-radius: 15px;
                padding: 0 10px;
            }
        }
    }
}
</style>
<style>
.taskbar-move,
.taskbar-enter-active,
.taskbar-leave-active {
    transition: all var(--transition-duration) ease !important;
}

.taskbar-enter-from,
.taskbar-leave-to {
    opacity: 0;
    transform: translateY(30px);
}

.dark{
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

.taskbar-leave-active {
    position: absolute;
}

.taskbar-tooltip{
    background-color: rgba(var(--light-bg), .66);
    backdrop-filter: blur(var(--blur-radius));
    color: black;
    font-size: 12px;
    padding: 2px 5px;

    &.dark{
        background-color: rgba(var(--dark-bg-2), .66);
        color: white;
    }
}
</style>