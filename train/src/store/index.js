import {
    createStore
} from "vuex";
const store = createStore({
    state: {
        menu: [{
                navigationId: "1",
                navigationName: "工作台",
                navigationPid: undefined,
                navigationUrl: "/workbench",
                navigationIcon: "src/img/gongzuotai.png",
            },

            {
                navigationId: "2",
                navigationName: "招生管理",
                navigationPid: undefined,
                navigationUrl: "/recruit",
                navigationIcon: "src/img/zhaoshengguanli.png",
                childern: [{
                    navigationId: "2-1",
                    navigationName: "渠道维护",
                    navigationPid: "2",
                    navigationUrl: "/channel",
                    navigationIcon: ""
                }, 
                {
                    navigationId: "2-2",
                    navigationName: "咨询登记",
                    navigationPid: "2",
                    navigationUrl: "/zixdj",
                    navigationIcon: ""
                }]
            },
            {
                navigationId: "3",
                navigationName: "行政管理",
                navigationPid: undefined,
                navigationUrl: "/administration",
                navigationIcon: "src/img//hangzhengguanli.png",
                childern: [
                    {
                    navigationId: "3-1",
                    navigationName: '员工考勤',
                    navigationName: '员工打卡',
                    navigationPid: "3",
                    navigationUrl:'/punch' ,
                    navigationIcon: undefined
                    },
                    {
                        navigationId: "3-2",
                        navigationName: '员工管理',
                        navigationPid: "3",
                        navigationUrl:'/staffManagement' ,
                        navigationIcon: undefined
                    },
                    {
                        navigationId: "3-3",
                        navigationName: '部门管理',
                        navigationPid: "3",
                        navigationUrl:'/deptManagement' ,
                        navigationIcon: undefined
                    },
                ]
            },
            {
                navigationId: "4",
                navigationName: "个人管理",
                navigationPid: undefined,
                navigationUrl: "/personal",
                navigationIcon: "src/img/gerenguanli.png",
                childern: [{
                    navigationId: "4-1",
                    navigationName: undefined,
                    navigationPid: "4",
                    navigationUrl: undefined,
                    navigationIcon: undefined
                }]
            },
            {
                navigationId: "5",
                navigationName: "教务管理",
                navigationPid: undefined,
                navigationUrl: "/educational",
                navigationIcon: "src/img/jiaowuguanli.png",
                childern: [{
                    navigationId: "5-1",
                    navigationName: "学员中心",
                    navigationPid: "5",
                    navigationUrl: "/student",
                    navigationIcon: ""
                },{
                    navigationId: "5-2",
                    navigationName: "班级管理",
                    navigationPid: "5",
                    navigationUrl: "/management",
                    navigationIcon: ""
                },{
                    navigationId: "5-3",
                    navigationName: "课程管理",
                    navigationPid: "5",
                    navigationUrl: "/curriculum",
                    navigationIcon: ""
                },
                {
                    navigationId: "5-4",
                    navigationName: "课表管理",
                    navigationPid: "5",
                    navigationUrl: "/Timetable",
                    navigationIcon: ""
                }]
            },
            {
                navigationId: "6",
                navigationName: "财务管理",
                navigationPid: undefined,
                navigationUrl: "/finance",
                navigationIcon: "src/img/caiwuguanli.png",
                childern: [{
                    navigationId: "6-1",
                    navigationName: "流水管理",
                    navigationPid: "6",
                    navigationUrl: "/flowingwater",
                    navigationIcon: "undefined"
                },
                {
                    navigationId: "6-2",
                    navigationName: "订单管理",
                    navigationPid: "6",
                    navigationUrl: "/order",
                    navigationIcon: "undefined"
                }]
            },
            {
                navigationId: "7",
                navigationName: "消息管理",
                navigationPid: undefined,
                navigationUrl: "/news",
                navigationIcon: "src/img/duihuaxinxi.png",
                childern: [{
                    navigationId: "7-1",
                    navigationName: undefined,
                    navigationPid: "7",
                    navigationUrl: undefined,
                    navigationIcon: undefined
                }]
            },
            {
                navigationId: "8",
                navigationName: "系统管理",
                navigationPid: undefined,
                navigationUrl: '/system',
                navigationIcon: "src/img/xitongguanli.png",
                childern: [{
                    navigationId: "8-1",
                    navigationName: "菜单管理",
                    navigationPid: "8",
                    navigationUrl: "/menu",
                    navigationIcon: "src/img/menu.png"
                }, {
                    navigationId: "8-2",
                    navigationName: "角色管理",
                    navigationPid: "8",
                    navigationUrl: "/position",
                    navigationIcon: "src/img/gongzuotai.png",
                }, 
                {
                    navigationId: "8-3",
                    navigationName: "测试",
                    navigationPid: "8",
                    navigationUrl: "/channel",
                    navigationIcon: "src/img/gongzuotai.png",
                }]
            }
        ]
    },

})


export default store