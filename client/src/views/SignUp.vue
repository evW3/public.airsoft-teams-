<template>
    <div class="sign-in">
        <form @submit.prevent="onSubmit" class="form">
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
                <div class="form__row">
                    <label for="password">Повторите пароль</label>
                    <input
                        type="password"
                        class="sign-in__input"
                        id="repeatPassword"
                        autocomplete="off"
                        placeholder="Повторите пароль"
                        v-model="repeatPassword"
                    >
                </div>
                <div class="form__row_d">
                    <label for="player" :class="{ 'form__radio_a': 'PLAYER' === role }">Игрок</label>
                    <input
                        type="radio"
                        class="form__radio"
                        id="player"
                        value="PLAYER"
                        v-model="role"
                    >
                    <label for="manager" :class="{ 'form__radio_a': 'MANAGER' === role }">Менеджер</label>
                    <input
                        type="radio"
                        class="form__radio"
                        id="manager"
                        value="MANAGER"
                        v-model="role"
                    >
                </div>
                <router-link
                    class="form__text"
                    @click="isOpen = true"
                    to="/sign-in"
                >Уже есть аккаунт?</router-link>
                <div class="form__block_b">
                    <div class="form__img google" />
                    <button type="submit">Зарегистрироваться</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import NotificationMessage from "../components/NotificationMessage";
    import ForgotPassword from "../components/modals/ForgotPassword";

    export default {
        name: "SignUp",
        data: () => ({
            password: null,
            repeatPassword: null,
            email: null,
            role: 'PLAYER',
        }),
        methods: {
            async onSubmit() {
                const password = this.password.trim();
                const email = this.email.trim();
                const role = this.role.trim();
                const repeatPassword = this.repeatPassword.trim();
                if(password && email && role && repeatPassword) {
                    if(repeatPassword === password) {
                        try {
                             await this.$store.dispatch('signUp', { password, repeatPassword, email, role });
                        } catch (e) {  }
                    } else {
                        this.$store.commit('pushNotification', { message: "Password mismatch" });
                    }
                }
            },
        },
        components: { NotificationMessage, ForgotPassword }
    }
</script>

<style scoped lang="scss">
    .sign-in {
        width: 100%;
        height: 100vh;
        user-select: none;
        background-color: black;
    }
    .form {
        display: flex;
        height: 100vh;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &__row {
            margin-bottom: 20px;
            &_d {
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                margin-bottom: 20px;
                & label {
                    cursor: pointer;
                    height: 20px;
                }
            }
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
        &__radio {
            display: none;
            &_a {
                border-bottom: 0.5px solid white;
            }
        }
        & button[type='submit'] {
            height: 35px;
            padding: 5px 10px;
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
    .fade-enter-active {
        animation: show .5s;
    }
    .fade-leave-to {
        animation: hide .5s;
    }
    @keyframes show {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    @keyframes hide {
        0%{
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
</style>