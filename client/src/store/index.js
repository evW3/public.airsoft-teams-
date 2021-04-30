import { createStore } from 'vuex';
import SignIn from './signIn';
import Token from './token';
import Notifications from './notifications';

export const store = createStore({
    state: {
        error: null,
        isLoading: null
    },
    getters: {
        error: s => s.error,
        isLoading: s => s.isLoading
    },
    mutations: {
        setError(state, error) {
            state.error = error;
        },
        setIsLoading(state, loading) {
            state.isLoading = loading;
        }
    },
    modules: { SignIn, Token, Notifications }
});