<template>
    <div class="accept" v-if="isAccepted"/>
    <div class="decline" v-else/>
</template>

<script>

    export default {
        name: "AcceptDecline",
        props: {
            isAccepted: Boolean
        }
    }
</script>