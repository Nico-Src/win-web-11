<template>
    <div id="windows-hub" :class="{hide: !show, 'dark-theme': darkMode}" ref="element">
        <div class="search-wrapper">
            <Icon name="material-symbols:search" size="22px"/>
            <div class="input-wrapper">
                <input class="input" type="text" v-model="search">
                <div :class="{placeholder: true, hide: search.length > 0}">{{ $t('windows-search-placeholder') }}</div>
            </div>
        </div>
        <div class="footer">
            <div class="profile">
                <img src="img/profile.jpg" class="image">
                <div class="name">
                    Username
                </div>
            </div>
            <div class="power-off-btn" @click="togglePowerOffMenu" ref="powerOffBtn">
                <Icon name="ph:power" size="22px"/>
                <div id="power-off-menu" :class="{'hide': !showPowerOffMenu}" ref="powerOffMenu">
                    <div class="option" @click="$emit('sign-out')"><Icon name="material-symbols-light:login-outline-rounded" size="22px"/>{{ $t('sign-out') }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const search = ref('');
const showPowerOffMenu = ref(false);
const powerOffBtn = ref(null);
const powerOffMenu = ref(null);
const props = defineProps(['show', 'darkMode']);
const element = ref(null);
defineExpose({el: element, hidePowerOffMenu: ()=>{showPowerOffMenu.value = false;}, powerOffMenu, powerOffBtn});
defineEmits(['sign-out']);

function togglePowerOffMenu(e){
    if(e.target === powerOffBtn.value) showPowerOffMenu.value = !showPowerOffMenu.value;
}
</script>
<style scoped>
#windows-hub.dark-theme{
    background-color: rgba(var(--dark-bg), .66); 
    border-color: rgba(var(--dark-bg-2), .66);

    .search-wrapper{background-color: rgba(var(--dark-bg-2), .66); border-color: rgba(var(--dark-bg-2), .66);}
    .search-wrapper:focus-within{background-color: rgba(var(--dark-bg-2), 1) !important;}
    .search-wrapper .icon{color: #aaa;}
    .search-wrapper .input{color: white;}
    .footer{background-color: rgba(var(--dark-bg), .66);}
    .footer .profile .name{color: white !important;}
    .footer .power-off-btn{color: white !important;}
    .footer .power-off-btn:hover{background-color: rgba(var(--dark-bg-2), .66) !important;}
    .footer .power-off-btn #power-off-menu{background-color: rgba(var(--dark-bg-2), 1) !important;}
    .footer .power-off-btn #power-off-menu .option{color: white !important;}
    .footer .power-off-btn #power-off-menu .option:hover{background-color: rgba(var(--light-bg), .2) !important;}
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
    backdrop-filter: blur(50px);
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

    .footer{
        position: absolute;
        left: 0; bottom: 0;
        width: 100%;
        height: 60px;
        border-radius: 0px 0px 4px 4px;
        background-color: rgba(var(--light-bg),0.66);
        transition: background-color var(--transition-duration) ease;
        display:flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;

        .profile{
            height: 50px;
            width: fit-content;
            display:flex;
            justify-content: center;
            align-items: center;

            .image{
                border-radius: 50%;
                width: 25px;
                aspect-ratio: 1;
                box-shadow: 0 0 16px 2px rgba(0, 0, 0, 0.2);
                display:flex;
                justify-content: center;
                align-items: center;
            }

            .name{
                margin-left: 10px;
                font-size: 14px;
                color: black;
                transition: color var(--transition-duration) ease;
            }
        }

        .power-off-btn{
            width: 30px;
            aspect-ratio: 1;
            cursor: pointer;
            display:flex;
            justify-content: center;
            align-items: center;
            border-radius: 4px;
            transition: background-color var(--transition-duration) ease;
            position: relative;

            &:hover{
                background-color: rgba(var(--light-bg), .66);
            }

            .icon{pointer-events: none;}

            #power-off-menu{
                position: absolute;
                bottom: 40px;
                margin: auto;
                width: 150px;
                height: fit-content;
                display:flex;
                box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.1);
                justify-content: center;
                align-items: center;
                flex-direction: column;
                border-radius: 4px;
                background-color: rgba(var(--light-bg), 1);
                backdrop-filter: blur(50px);
                transition: opacity var(--transition-duration) ease, transform var(--transition-duration) ease;
                will-change: opacity, transform;
                padding: 5px;

                &.hide{
                    opacity: 0;
                    transform: translateY(20px);
                    pointer-events: none;
                }

                .option{
                    height: 30px;
                    width: 100%;
                    border-radius: 4px;
                    display:flex;
                    justify-content: flex-start;
                    align-items: center;
                    color: black;
                    transition: background-color var(--transition-duration) ease, color var(--transition-duration) ease;

                    .icon{
                        margin-left: 2px;
                        margin-right: 10px
                    }

                    &:hover{
                        background-color: rgba(var(--dark-bg), .1);
                    }
                }
            }
        }
    }
}
</style>