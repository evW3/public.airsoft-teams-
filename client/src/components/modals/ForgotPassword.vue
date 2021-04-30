<template>
    <BaseModal>
        <form @submit.prevent="onSubmit" class="forgot-form">
            <button class="forgot-form__close" @click="close">×</button>
            <span class="forgot-form__title">Введите email</span>
            <input
                type="text"
                autocomplete="off"
                placeholder="Введите email"
                v-model="email"
                class="forgot-form__input"
            >
            <button type="submit">Отправить код</button>
        </form>
    </BaseModal>
</template>

<script>
    import BaseModal from "./BaseModal";
    export default {
        name: "ForgotPassword",
        data: () => ({
            email: null
        }),
        methods: {
            async onSubmit() {
                const email = this.email.trim();
                if(email) {
                    this.$store.dispatch('forgotPassword', email);
                    this.$emit('close');
                }
            },
            close() {
                this.$emit('close');
            }
        },
        components: { BaseModal }
    }
</script>

<style scoped lang="scss">
    .forgot-form {
        position: relative;
        display: flex;
        background-color: black;
        padding: 20px;
        border: 0.5px solid white;
        flex-direction: column;
        align-items: center;
        & input {
            background-color: transparent!important;
            color: white!important;
            border: 0.5px solid white;
            padding: 5px 20px 5px 10px;
            margin-bottom: 20px;
        }
        &__title {
            font-size: 15px;
            margin-bottom: 20px;
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
        & button[type='submit'] {
            background-color: transparent;
            color: white;
            padding: 5px 10px;
            cursor: pointer;
            border: 0.5px solid white;
            &:hover {
                color: black;
                background-color: white;
            }
        }
    }
</style>