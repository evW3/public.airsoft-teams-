<template>
    <div class="sign-in">
        <form @submit.prevent=" isMessage = !isMessage" class="form">
            <div>
                <div class="form__row">
                    <label for="email">Email</label>
                    <input
                        type="text"
                        class="sign-in__input"
                        id="email"
                        autocomplete="off"
                        placeholder="Введите email"
                        v-model="email"
                    >
                </div>
                <div class="form__row">
                    <label for="password">Пароль</label>
                    <input
                        type="password"
                        class="sign-in__input"
                        id="password"
                        autocomplete="off"
                        placeholder="Введите пароль"
                        v-model="password"
                    >
                </div>
                <span class="form__text">Забыли пароль?</span>
                <div class="form__block">
                    <span class="form__text">Ещё нет аккаунта?</span>
                </div>
                <div class="form__block_b">
                    <div class="form__img google" @click="test"/>
                    <button type="submit">Войти</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import NotificationMessage from "../components/NotificationMessage";
    import { v4 as uuid } from 'uuid';

    export default {
        name: "SignIn",
        components: {NotificationMessage},
        data: () => ({
            password: null,
            email: null,
            isMessage: false,
            text: "Can`t recover password"
        }),
        methods: {
            async onSubmit() {
                const password = this.password.trim();
                const email = this.email.trim()
                if( password && email) {
                    await this.$store.dispatch('signIn', { password, email });
                }
            },

            test() {
                this.$store.commit('pushNotification', { message: uuid().split('-')[0] });
            }
        }
    }
</script>

<style scoped lang="scss">
    .sign-in {
        width: 100%;
        height: 100vh;
        background-color: black;
    }
    .form {
        display: flex;
        height: 100vh;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &__row {
            width: 10%;
            flex-direction: column;
            justify-content: space-between;
            margin-bottom: 20px;
            & label {
                margin-bottom: 5px;
                display: block;
            }
            & input {
                background-color: transparent!important;
                color: white!important;
                border: 0.5px solid white;
                padding: 5px 20px 5px 10px;
            }
        }
        &__text {
            width: fit-content;
            height: 20px;
            display: block;
            margin-bottom: 20px;
            cursor: pointer;
            &:hover {
                border-bottom: 0.5px solid white;
            }
            &_right {
                width: 100%;
                justify-content: end;
            }
        }
        &__block {
            display: flex;
            justify-content: flex-end;
            &_b {
                display: flex;
                justify-content: space-between;
            }
        }
        &__img {
            display: block;
            width: 24px;
            height: 35px;
            cursor: pointer;
        }
        & button[type='submit'] {
            width: 100px;
            height: 35px;
            background-color: transparent;
            color: white;
            cursor: pointer;
            border: 0.5px solid white;
            &:hover {
                color: black;
                background-color: white;
            }
        }
    }

    .google {
        background-image: url('../assets/imgs/icons/google.png');
        background-repeat: no-repeat;
        background-position: center;
    }
</style>