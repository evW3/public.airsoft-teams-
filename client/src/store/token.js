export default {
    state: {
        token: null
    },
    getters: { token: s => s.token },
    mutations: {
        setToken(state, token) {
            console.log(token);
            state.token = token;
            localStorage.setItem('token', token);
        }
    },
    action: {
        tokenInit({ commit, dispatch }) {
            const token = localStorage.getItem('token');
            if(token) {
                this.state.token = token;
            } else {
                commit('setError', "Token is`t set");
            }
        }
    }
};