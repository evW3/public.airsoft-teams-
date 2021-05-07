import { createWebHistory, createRouter } from 'vue-router';

const router = createRouter({
    mode: 'history',
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('../views/Home'),
            meta: { auth: true, layout: "base" }
        },
        {
            path: "/profile",
            name: "Profile",
            component: () => import("../views/Profile"),
            meta: { auth: false, layout: "base" }
        },
        {
            path: '/sign-in',
            name: 'sign-in',
            component: () => import('../views/SignIn'),
            meta: { auth: false, layout: "empty" }
        },
        {
            path: '/sign-up',
            name: 'sign-up',
            component: () => import('../views/SignUp'),
            meta: { auth: false, layout: "empty" }
        },
        {
            path: '/register-device',
            name: 'register-device',
            component: () => import('../views/RegisterDevice'),
            meta: { auth: false, layout: "empty" }
        },
        {
            path: '/forgot-password',
            name: 'forgot-password',
            component: () => import('../views/ForgotPassword'),
            meta: { auth: false, layout: "empty" }
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: () => import('../components/PageNotFound'),
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


