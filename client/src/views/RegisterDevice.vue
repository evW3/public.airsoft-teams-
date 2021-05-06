<template>
    <div class="register-device">
        <Loader v-if="isLoading"/>
        <AcceptDecline :isAccepted="isAccepted" v-else/>
    </div>
</template>

<script>
    import { mapGetters } from "vuex"
    import Loader from "../components/Loader";
    import AcceptDecline from "../components/AcceptDecline";

    export default {
        name: "RegisterDevice",
        components: { AcceptDecline, Loader },
        data: () => ({
            isAccepted: false
        }),
        computed: {
            ...mapGetters(['isLoading'])
        },
        async beforeMount() {
            try {
                this.$store.commit('setIsLoading', true);
                const token = this.$route.query.token;
                await this.$store.dispatch('sendDeviceCode', token);
                this.isAccepted = true;
                this.$store.commit('setIsLoading', false);
            } catch (e) {
                this.$store.commit('setIsLoading', false);
                this.isAccepted = false;
            }
        }
    }
</script>

<style scoped lang="scss">

    .register-device {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: black;
    }
</style>