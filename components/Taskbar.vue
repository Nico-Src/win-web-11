<template>
    <TransitionGroup id="taskbar" ref="taskbarEl" tag="div" name="taskbar">
        <div class="taskbar-item" v-for="task in tasks" :key="task.id" @mousedown="taskDown($event)" @mouseup="taskUp($event)" @mouseleave="taskUp($event)" @click="taskClick(task.action)" :data-name="task.name">
            <img :src="darkMode ? task.darkIcon : task.icon" :alt="task.name" :width="task.iconSize" :height="task.iconSize" :name="task.name">
            <q-tooltip v-if="!task.hideToolTip" transition-show="fade" transition-hide="fade" :transition-duration="300" :delay="1000" :class="{'taskbar-tooltip': true, dark: darkMode}">
                {{ $t(task.name) }}
            </q-tooltip>
        </div>
    </TransitionGroup>
</template>
<script setup>
const props = defineProps(['tasks','taskDown','taskUp','taskClick','darkMode']);
</script>
<style scoped>
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
</style>
<style>
.dark-theme{
    #taskbar{background-color: rgba(var(--dark-bg), .66); border-color: rgba(var(--dark-bg-2), .66);}
    #taskbar .taskbar-item:hover{background-color: rgba(var(--dark-bg-2), .66) !important;}
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

.taskbar-leave-active {
    position: absolute;
}
</style>