<template>
    <div id="startupScreen" :class="{hide: !show}">
        <img src="icons/windows.png" class="logo">
        <Icon name="svg-spinners:ring-resize" size="35px" :class="{spinner: true, hide: !showLoader}"/>
    </div>
</template>
<script setup>
const props = defineProps(['show', 'showLoader']);
</script>
<style scoped>
#startupScreen{
    position: fixed;
    z-index: 9999;
    inset: 0;
    background-color: black;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    opacity: 1;
    transition: opacity var(--transition-duration) ease;

    &.hide{opacity: 0;pointer-events: none;}

    .logo{
        width: 200px;
        aspect-ratio: 1;
        transform: translateY(-50px);
    }

    .spinner{
        margin-top: 100px;
        color: white;
        transition: opacity var(--transition-duration) ease;

        &.hide{opacity: 0;}
    }
}
</style>