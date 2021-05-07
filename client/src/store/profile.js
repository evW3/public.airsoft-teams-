import { API_URL } from '../constants';
import { get } from 'axios';

export default {
    state: {
        user: {}
    },
    actions: {
        async initUser() {
            try {
                console.log(await this.getters.token);
                //const response = await get(`${ API_URL }/users/profile`);
            } catch (e) {  }
        }
    }
};