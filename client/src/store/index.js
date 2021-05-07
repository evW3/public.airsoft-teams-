import { createStore } from 'vuex';
import Auth from './auth';
import Token from './token';
import Notifications from './notifications';
import ForgotPassword from "./forgotPassword";
import Codes from "./codes";
import Profile from "../views/Profile";

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
    modules: { Auth, Token, Notifications, ForgotPassword, Codes, Profile }
});