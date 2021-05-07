import { API_URL } from '../constants';
import { get } from 'axios';

export default {
    state: {
        user: {}
    },
    getters: { user: s => s.user },
    mutations: {
        setUser(state, user) {
            state.user = user;
        }
    },
    actions: {
        async initUser({ commit, dispatch }, token) {
            try {
                const response = await get(`${ API_URL }/users/profile`, { headers: { Authorization: `Bearer ${ token }` } });
                commit('setUser', response.data.user);
            } catch (e) {  }
        }
    }
};