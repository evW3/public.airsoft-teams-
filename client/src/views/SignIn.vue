<template>
    <div class="sign-in">`
        <form @submit.prevent="onSubmit" class="form">
            <div>
                <div class="form__row">
                    <label for="email">Email</label>
                    <input
                        type="text"
                        class="sign-in__input"
                        id="email"
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
                        placeholder="Введите пароль"
                        v-model="password"
                    >
                </div>
                <span class="form__text">Забыли пароль?</span>
                <div class="form__block">
                    <span class="form__text">Уже есть аккаунт?</span>
                </div>
                <button type="submit">Войти</button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "SignIn",
        data: () => ({
            password: null,
            email: null
        }),
        methods: {
            onSubmit() {
                if(this.password.trim() && this.email.trim()) {

                }
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
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &__row {
            width: 10%;
            flex-direction: column;
            justify-content: space-between;
            margin-bottom: 20px;
            label {
                margin-bottom: 5px;
                display: block;
            }
            input {
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
        }
        button[type='submit'] {
            width: 100px;
            height: 35px;
            background-color: transparent;
            color: white;
            cursor: pointer;
            border: 0.5px solid white;
            margin-left: calc(50% - 50px);
            &:hover {
                color: black;
                background-color: white;
            }
        }
    }
</style>