<template>
    <form @submit.prevent="onSubmit">

    </form>
</template>

<script>
    import { mapGetters } from "vuex"
    import ForgotPassword from "../components/modals/ForgotPassword";

    export default {
        name: "Profile",
        data: () => ({
            email: null,
            login: null
        }),
        computed: {
            ...mapGetters(['token', 'user'])
        },
        async mounted() {
            try {
                await this.$store.dispatch('initUser', this.token);
            } catch (e) {
                console.log(e);
            }
        },
        methods: {
            onSubmit() {
                const email = this.email.trim();
                const login = this.login.trim();
            }
        },
        components: { ForgotPassword }
    }
</script>

<style scoped>

</style>