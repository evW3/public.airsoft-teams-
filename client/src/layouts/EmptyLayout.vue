<template>
    <main>
        <NotificationList />
        <router-view/>
    </main>
</template>

<script>
    import NotificationList from "../components/NotificationList";
    export default {
        name: "Empty",
        components: { NotificationList }
    }
</script>