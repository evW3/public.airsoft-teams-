import { API_URL } from '../constants';
import { put, post } from 'axios';

export default {
    actions: {
        async signIn({ commit, dispatch }, user) {
            if(user) {
                    commit('setIsLoading', true);
                    const response = (await post(`${ API_URL }/users/sign-in`, { email: user.email, password: user.password }));
                    commit('setToken', response.data.token);
            } else {
                commit('pushNotification', 'Incorrect user data');
            }
            commit('setIsLoading', false);
        },

        async signUp({ commit, dispatch }, user) {
            console.log(user);
            if(user) {
                try {
                    commit('setIsLoading', true);
                    const response = (await put(`${ API_URL }/users/sign-up`,
                        {
                            email: user.email,
                            password: user.password,
                            repeatPassword: user.repeatPassword,
                            role: user.role
                        })
                    );
                    commit('pushNotification', { message: response.data.message });
                } catch (e) {
                    commit('pushNotification', { message: e.response.data.error });
                }
            } else {
                commit('pushNotification', 'Incorrect user data');
            }
            commit('setIsLoading', false);
        }
    }
};