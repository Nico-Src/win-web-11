<template>
    <div id="lockScreen" :class="{hide: signedIn || hideStartup}">
        <img src="wallpaper/light.jpg" class="background">
        <div class="content-wrapper">
            <span class="time">{{ moment().locale($langs.find(l => l.key == $i18n.locale).locale).format(`${$i18n.locale == 'de' ? 'HH' : 'hh'}:mm${$i18n.locale == 'de' ? '' : ' A'}`) }}</span>
            <span class="date">{{ moment().locale($langs.find(l => l.key == $i18n.locale).locale).format('dddd, Do MMMM YYYY') }}</span>
            <q-btn @click="signedIn = true">{{ $t('sign-in') }}</q-btn>
        </div>
    </div>
</template>
<script setup>
import moment from 'moment/min/moment-with-locales';
const props = defineProps(['signedIn', 'hideStartup']);
</script>
<style scoped>
#lockScreen{
    position: fixed;
    z-index: 9998;
    inset: 0;
    background-color: black;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    opacity: 1;
    transition: opacity var(--transition-duration) ease;

    &.hide{opacity: 0;pointer-events: none;}

    .background{
        width: 250%;
        height: 250%;
        object-fit: cover;
        filter: blur(20px);
    }

    .content-wrapper{
        position: fixed;
        inset: 0;
        display:flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .time{
            color: white;
            font-size: 50px;
            font-weight: 600;
        }

        .date{
            color: #ccc;
            font-size: 17px;
            font-weight: 400;
            transform: translateY(-10px);
        }

        .q-btn{
            margin-bottom: 320px;
            background-color: rgba(var(--light-bg),0.66);
            color: black;
        }
    }
}
</style>