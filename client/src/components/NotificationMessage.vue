<template>
    <div class="notification" :class="{ 'notification_hide': isHidden }">
        <button class="notification__close" @click="isHidden = true">×</button>
        <span class="notification__text">{{ message }}</span>
    </div>
</template>

<script>
    export default {
        name: "NotificationMessage",
        props: { message: String, id: String },
        data: () => ({
            isHidden: false
        }),
        methods: {
            clear() {
                this.$store.dispatch('deleteNotification', id);
            }
        }
    }
</script>

<style scoped lang="scss">
    .notification {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        min-width: 150px;
        height: 50px;
        position: relative;
        border: 0.5px solid white;
        padding: 15px 25px 15px 20px;
        animation: show 2s;
        margin-bottom: 20px;
        &__text {
            color: white;
        }
        &__close {
            color: white;
            background-color: transparent;
            font-size: 18px;
            position: absolute;
            right: 8px;
            top: 4px;
            cursor: pointer;
        }
        &_hide {
            display: none;
        }
    }

    @keyframes show {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
</style>