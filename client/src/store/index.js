import { createStore } from 'vuex';
import SignIn from './signIn';
import Token from './token';
import Notifications from './notifications';
import ForgotPassword from "./forgotPassword";

export const store = createStore({
    state: {
        isLoading: null
    },
    getters: {
        error: s => s.error,
        isLoading: s => s.isLoading
    },
    mutations: {
        setIsLoading(state, loading) {
            state.isLoading = loading;
        }
    },
    modules: { SignIn, Token, Notifications, ForgotPassword }
});