import { createRouter,createWebHistory } from "vue-router"
import register from '../view/Register.vue';
import layout from '../layout/layout.vue';
import recruit from '../view/recruit.vue';
import role from '../view/role.vue';
import workbench from '../view/lwz/workbench.vue';
import punch from "../view/lwz/punch.vue";
import staffManagement from "../view/lwz/staffManagement.vue";
import deptManagement from "../view/lwz/deptManagement.vue";
import zixdj from '../ty/registration.vue'
import student from '../ty/studentcenter.vue'
import management from '../ty/management.vue'
import freshman from '../ty/freshman.vue'
const routes=[
    { path: '/', component: layout, redirect: "/workbench",
    children:[
        { path: '/workbench', component: workbench },
        { path: '/attendance', component: punch},
        { path: '/staffManagement', component: staffManagement},
        { path: '/deptManagement', component: deptManagement},
        { path: '/punch', component: punch},
        { path: '/recruit', component: recruit } ,
        { path: '/personal', component: role },
        // syz
        { path: '/users', component: ()=>import('../syz/view/users/users.vue') },
        { path: '/menu', component: ()=>import ('../syz/view/menu/menu.vue') },
        { path: '/channel', component: ()=>import ('../syz/view/channel/channel.vue') },
        { path: '/position', component: ()=>import('../syz/view/position/position.vue') },
        { path: '/payment', component: ()=>import('../syz/view/Payment/payment copy.vue') },
        { path: '/order', component: ()=>import('../syz/view/test/b.vue') },
        { path: '/flow', component: ()=>import('../syz/view/test/a.vue') },
        { path: '/school', component: ()=>import('../syz/view/Finance/expenditure.vue') },

        {path:"/freshman", component: freshman},
        { path: '/management', component: management},
        { path:'/student', component: student,},
        { path:'/zixdj', component: zixdj},
    ],
    },
    { path: '/login', component: ()=>import('../syz/view/login.vue') },
    { path: '/register', component: register },
    { path: '/:catchAll(.*)',name:'404', component: ()=>import('../view/404/404.vue') }
]
const router=createRouter({
    history:createWebHistory(),
    routes
})

export default router