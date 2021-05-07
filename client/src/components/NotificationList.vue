<template>
    <div class="notification-list">
        <notification-message
            v-for="n in notifications"
            :key="n.id"
            :message="n.message"
            :id="n.id"
        />
    </div>
</template>

<script>
    import NotificationMessage from "./NotificationMessage";
    import { mapGetters } from "vuex"
    export default {
        name: "NotificationList",
        computed: {
            ...mapGetters(['notifications'])
        },
        components: { NotificationMessage }
    }
</script>

<style scoped lang="scss">
    .notification-list {
        position: fixed;
        background-color: transparent;
        right: 0;
        bottom: 0;
        min-width: 150px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: flex-end;
        padding: 20px 20px 0 20px;
    }
</style>