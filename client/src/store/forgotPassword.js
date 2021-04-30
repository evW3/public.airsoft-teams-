import { API_URL } from '../constants';
import { post } from 'axios';

export default {
    actions: {
        async forgotPassword({ commit, dispatch }, email) {
            if(email) {
                try {
                    commit('setIsLoading', true);
                    const response = await post(`${ API_URL }/users/recover-password`, { email });
                    commit('pushNotification', { message: response.data.message });
                } catch (e) {
                    commit('pushNotification', { message: e.response.data.error });
                }
            } else {
                commit('pushNotification', { message: "Email can`t be empty" });
            }
            commit('setIsLoading', false);
        },
    }
};