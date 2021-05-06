import { API_URL } from '../constants';
import { post } from 'axios';

export default {
    actions: {
        async sendDeviceCode({ commit, dispatch }, token) {
            await post(`${ API_URL }/users/register-devices`, { headers: { Authorization: `Bearer ${ token }` }});
        },
        async sendRecoverCode({ commit, dispatch }, data) {
            await post(`${ API_URL }/users/forgot-password`,
                {
                    headers: { Authorization: `Bearer ${ data.token }` },
                    body: { password: data.password, repeatPassword: data.repeatPassword }
                }
            );
        }
    }
};