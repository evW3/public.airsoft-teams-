<template>
    <div class="sign-in">
        <form
            @submit.prevent="onSubmit"
            class="form"
            v-if="isAccepted === null"
        >
            <div>
                <div class="form__row">
                    <label for="password">Пароль</label>
                    <input
                        type="password"
                        class="sign-in__input"
                        id="password"
                        minlength="6"
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
                        minlength="6"
                        id="repeatPassword"
                        autocomplete="off"
                        placeholder="Повторите пароль"
                        v-model="repeatPassword"
                    >
                </div>
                <div class="form__block_b">
                    <button type="submit">Изменить пароль</button>
                </div>
            </div>
        </form>
        <Loader v-else-if="isLoading"/>
        <AcceptDecline :isAccepted="isAccepted" v-else-if="isAccepted !== null" />
    </div>
</template>

<script>
    import AcceptDecline from "../components/AcceptDecline";
    import Loader from "../components/Loader";
    import { mapGetters } from "vuex";

    export default {
        name: "SignUp",
        data: () => ({
            password: null,
            repeatPassword: null,
            token: null,
            isAccepted: null
        }),
        beforeMount() {
            this.token = this.$route.query.token;
        },
        computed: {
            ...mapGetters(['isLoading'])
        },
        methods: {
            async onSubmit() {
                const password = this.password.trim();
                const repeatPassword = this.repeatPassword.trim();
                if(password && repeatPassword) {
                    if(repeatPassword === password) {
                        try {
                            this.$store.commit('setIsLoading', true);
                            await this.$store.dispatch('sendRecoverCode', { password, repeatPassword, token: this.token });
                            this.isAccepted = true;
                            this.$store.commit('setIsLoading', false);
                        } catch (e) {
                            this.isAccepted = false;
                            this.$store.commit('setIsLoading', false);
                        }
                    } else {
                        this.$store.commit('pushNotification', { message: "Password mismatch" });
                    }
                }
            },
        },
        components: { Loader, AcceptDecline }
    }
</script>

<style scoped lang="scss">
    .sign-in {
        width: 100%;
        height: 100vh;
        user-select: none;
        display: flex;
        justify-content: center;
        align-items: center;
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
                justify-content: center;
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