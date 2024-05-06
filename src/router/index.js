import {createRouter, createWebHistory, useRoute} from "vue-router";

import Login from "../pages/Auth/Login.vue";

import SideMenu from  "../layout/SideMenu.vue";

import Dashboard from "../pages/Dashboard/index.vue";

import Categories from "../pages/Categories/index.vue";
import CreateCategories from "../pages/Categories/create.vue";
import UpdateCategories from "../pages/Categories/update.vue";

import Products from "../pages/Products/index.vue";
import CreateProducts from "../pages/Products/create.vue";
import UpdateProducts from "../pages/Products/update.vue";

import Orders from "../pages/Orders/index.vue";
import OrdersView from "../pages/Orders/view.vue";

import Customers from "../pages/Customers/index.vue"

import UserProfile from "../pages/Profile/index.vue";
import NotFound from "../components/NotFound/index.vue";
import {useAuthStore} from "../stores/auth.js";

const routes = [
    {
        path: "/login",
        name: "login",
        component: Login,
        meta: {
            middleware: "guest",
        },
    },
    {
        path: "/",
        name: "side-menu",
        component:SideMenu,
        meta: {
            middleware: "auth",
        },
        children: [
            {
                path: "dashboard",
                name: "dashboard",
                component: Dashboard,
                meta: {
                    middleware: "auth",
                },
            },
            {
                path: "categories",
                name: "categories",
                component: Categories,
                meta: {
                    middleware: "auth",
                },
            },
            {
                path: "categories/create",
                name: "category-create",
                component: CreateCategories,
                meta: {
                    middleware: "auth",
                },
            },
            {
                path: "categories/update/:id",
                name: "category-update",
                component: UpdateCategories,
                meta: {
                    middleware: "auth",
                },
            },
            {
                path: "products",
                name: "products",
                component: Products,
                meta: {
                    middleware: "auth",
                },
            },
            {
                path: "products/create",
                name: "product-create",
                component: CreateProducts,
                meta: {
                    middleware: "auth",
                },
            },
            {
                path: "products/update/:id",
                name: "product-update",
                component: UpdateProducts,
                meta: {
                    middleware: "auth",
                },
            },
            {
                path: "orders",
                name: "orders",
                component: Orders,
                meta: {
                    middleware: "auth",
                },
            },
            {
                path: "orders/:id",
                name: "order-view",
                component: OrdersView,
                meta: {
                    middleware: "auth",
                },
            },
            {
                path: "customers",
                name: "customers",
                component: Customers,
                meta: {
                    middleware: "auth",
                },
            },

            {
                path: "user/profile/:id",
                name: "user-profile",
                component: UserProfile,
                meta: {
                    middleware: "auth",
                },
            },

        ]
    },
    {
        path: "/:pathMatch(.*)*",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const authUser = authStore.user;
    const requiresAuth = to.matched.some(record => record.meta.middleware !== 'guest');


    if (requiresAuth && !authUser) {
        next({ name: 'login' });
    }
    else if (to.meta.middleware === 'guest' && authUser) {
        next({ name: 'dashboard' });
    }
    next();
});

export default router;