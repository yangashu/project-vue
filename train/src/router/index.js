import { createRouter,createWebHistory } from "vue-router"
import register from '../view/Register.vue';
import layout from '../layout/layout.vue';
import recruit from '../view/recruit.vue';
import role from '../view/role.vue';
import workbench from '../view/lwz/workbench.vue';
import attendance from "../view/lwz/attendance.vue";
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
        { path: '/attendance', component: attendance},
        { path: '/staffManagement', component: staffManagement},
        { path: '/deptManagement', component: deptManagement},
        { path: '/induction', component: ()=>import('../view/lwz/induction.vue')},
        { path: '/recruit', component: recruit } ,
        { path: '/personal', component: role },
        // syz
        { path: '/users', component: ()=>import('../syz/view/users/users.vue') },
        { path: '/menu', component: ()=>import ('../syz/view/menu/menu.vue') },
        { path: '/channel', component: ()=>import ('../syz/view/channel/channel.vue') },
        { path: '/position', component: ()=>import('../syz/view/position/position.vue') },
        { path: '/finance', component: ()=>import('../syz/view/Finance/finance.vue') },
        { path: '/order', component: ()=>import('../syz/view/test/b.vue') },


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