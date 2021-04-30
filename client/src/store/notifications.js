import { v4 as uuid } from "uuid";

export default {
    state: {
        notifications: []
    },
    getters: { notifications: s => s.notifications },
    mutations: {
        pushNotification(state, notification) {
            notification.id = uuid();
            state.notifications.push(notification)
        }
    },
    actions: {
        deleteNotification({}, id) {
            let state = this.state.notifications;
            const index = state.findIndex(n => n.id === id);
            if(index) {
                state.splice(index, 1);
            }
        }
    }
};