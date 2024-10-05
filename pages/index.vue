<script setup>
const route = useRoute();
const router = useRouter();
const snackbar = useSnackbar();
import Taskbar from '~/classes/core/taskbar.js';

const darkMode = ref(false);
const taskbar = ref(new Taskbar());
const taskbarEl = ref(null);

function taskDown(event){
    const target = event.target;
    target.classList.add('clicked');
}

function taskUp(event){
    const target = event.target;
    target.classList.remove('clicked');
}

useSeoMeta({
    // wrap title in computed function so title gets updated correctly
    title: () => 'Windows 11',
});

onMounted(()=>{
    taskbar.value.setElement(taskbarEl.value);
});
</script>
<template>
    <div :class="{bg: true, dark: darkMode}" ref="scrollEl">
        <div class="bg-wrapper">
            <img :class="{hide: darkMode}" src="/wallpaper/light.jpg">
            <img :class="{hide: !darkMode}" src="/wallpaper/dark.jpg">
        </div>
        <div id="taskbar" ref="taskbarEl">
            <div class="taskbar-item" v-for="task in taskbar.tasks" :key="task.id" @mousedown="taskDown($event)" @mouseup="taskUp($event)" @mouseleave="taskUp($event)">
                <img :src="darkMode ? task.darkIcon : task.icon" :alt="task.name" :width="task.iconSize" :height="task.iconSize" :name="task.name">
            </div>
        </div>
        <div id="theme-toggle" @click="darkMode = !darkMode">
            <Icon :name="darkMode ? 'material-symbols:dark-mode' : 'material-symbols:light-mode'" size="22px"/>
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
    #taskbar{background-color: rgba(32, 32, 32, .66); border-color: rgba(64, 64, 64, .66);}
    #taskbar .taskbar-item:hover{background-color: rgba(64, 64, 64, .66) !important;}
    #theme-toggle{background-color: rgba(32, 32, 32, .66); color: white;}
    #theme-toggle:hover{background-color: rgba(64, 64, 64, .66) !important;}
}

#taskbar{
    width: 100%;
    height: 50px;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
    background-color: rgba(255,255,255,0.66);
    border-top: 1px solid rgba(255,255,255,.1);
    backdrop-filter: blur(20.5px);
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
            background-color: rgba(255,255,255,0.66);
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
    background-color: rgba(255,255,255,0.66);
    transition: background-color var(--transition-duration) ease, color var(--transition-duration) ease;

    &:hover{
        background-color: white;
    }
}
</style>