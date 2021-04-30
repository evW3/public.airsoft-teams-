import { API_URL } from '../constants';
import { post } from 'axios';

export default {
    actions: {
        async signIn({ commit, dispatch }, user) {
            if(user) {
                try {
                    commit('setIsLoading', true);
                    const token = (await post(`${ API_URL }/users/sign-in`, { email: user.email, password: user.password })).data.token;
                    commit('setToken', token);
                } catch (e) {
                    commit('setError', 'incorrect user');
                }
            } else {
                commit('setError', 'incorrect user');
            }
            commit('setIsLoading', false);
        },
    }
};