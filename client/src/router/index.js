import { createWebHistory, createRouter } from 'vue-router';

const router = createRouter({
    mode: 'history',
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('../views/Home'),
            meta: { auth: true, layout: "main" }
        },
        {
            path: '/sign-in',
            name: 'sign-in',
            component: () => import('../views/SignIn'),
            meta: { auth: false, layout: "empty" }
        }
    ],
});

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.auth)) {
        if(localStorage.getItem('token')) {
            next();
        } else {
            next('/sign-in');
        }
    } else {
        next();
    }
});

export { router };


