import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import Register from "../views/Register";
import guest from "./middleware/guest";
import authenticated from "./middleware/authenticated";
import middlewarePipeline from "./middlewarePipeline";
import store from '../store/index'
import Profile from "../views/Profile";
import Balance from "../views/Balance";
import Calls from "../views/Calls";

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            middleware: [
                authenticated
            ]
        }
    },

    {
        path: '/logout',
        name: 'Logout',
    },

    {
        path: '/register',
        name: 'Register',
        component: Register,
    },


    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            middleware: [
                guest
            ]
        }
    },

    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: {
            middleware: [
                guest
            ]
        }
    },

    {
        path: '/balance/',
        name: 'Balance',
        component: Balance,
        meta: {
            middleware: [
                guest
            ]
        }
    },

    {
        path: '/calls/',
        name: 'Calls',
        component: Calls,
        meta: {
            middleware: [
                guest
            ]
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (!to.meta.middleware) {
        return next()
    }
    const middleware = to.meta.middleware
    const context = {
        to,
        from,
        next,
        store
    }
    return middleware[0]({
        ...context,
        next: middlewarePipeline(context, middleware, 1)
    })
})

export default router
