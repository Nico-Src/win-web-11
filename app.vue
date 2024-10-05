<script setup>
const route = useRoute();

const isMounted = ref(false);

onMounted(()=>{
    isMounted.value = true;
});
</script>
<template>
  <div id="app" :class="`${isMounted ? '' : 'app-loading'}`">
    <NuxtPage/>
    <NuxtSnackbar/>
  </div>
</template>
<style scoped>
#app-content{
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>
<style>
.page-enter-active,
.page-leave-active {
    transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
    opacity: 0;
}

.vue3-snackbar-message-title{
    font-weight: normal !important;
}

.vue3-snackbar-message{
    border-radius: 0px 4px 4px 0px !important;
}

.q-menu.light{background-color: var(--light-color) !important;}
.q-menu.mid{background-color: var(--mid-color) !important;}

.q-menu{
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.16), 0 2px 2px rgba(0, 0, 0, 0.10), 0 3px 1px -2px rgba(0, 0, 0, 0.08)
}

.q-menu .q-item{
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    min-height: 30px !important;
}
</style>