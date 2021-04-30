export default {
    state: {
        token: null
    },
    getters: { token: s => s.token },
    mutations: {
        setToken(state, token) {
            state.token = token;
            localStorage.setItem('token', token);
        },
        deleteToken(state, token) {
            state.token = null;
            localStorage.removeItem('token');
        }
    },
    action: {
        tokenInit({ commit, dispatch }) {
            const token = localStorage.getItem('token');
            if(token) {
                this.state.token = token;
            }
        }
    }
};