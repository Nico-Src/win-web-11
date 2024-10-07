<template>
    <div id="windows-hub" :class="{hide: !show, 'dark-theme': darkMode}" ref="element">
        <div class="search-wrapper">
            <Icon name="material-symbols:search" size="22px"/>
            <div class="input-wrapper">
                <input class="input" type="text" v-model="search">
                <div :class="{placeholder: true, hide: search.length > 0}">{{ $t('windows-search-placeholder') }}</div>
            </div>
        </div>
    </div>
</template>
<script setup>
const search = ref('');
const props = defineProps(['show', 'darkMode']);
const element = ref(null);
defineExpose({el: element});
</script>
<style scoped>
#windows-hub.dark-theme{
    background-color: rgba(var(--dark-bg), .66); 
    border-color: rgba(var(--dark-bg-2), .66);

    .search-wrapper{background-color: rgba(var(--dark-bg-2), .66); border-color: rgba(var(--dark-bg-2), .66);}
    .search-wrapper:focus-within{background-color: rgba(var(--dark-bg-2), 1) !important;}
    .search-wrapper .icon{color: #aaa;}
    .search-wrapper .input{color: white;}
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