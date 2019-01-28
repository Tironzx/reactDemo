
import Login from '../components/Login';

import Home from '../components/Home'

import MemberList from '../components/member/MemberList' //会员管理

import GoodsManage from '../components/goods/GoodsManger' //商品管理

import OrderLists from '../components/order/OrderLists'; //订单列表

import ClassLists from '../components/class/ClassLists'; //分类管理

import DealersLists from '../components/dealers/DealersLists'; //经销商管理

import ParamsSet from '../components/params/ParamsSet'; //参数设置

import BannerSet from '../components/banner/BannerSet'; //广告设置

import GroupLists from '../components/group/GroupLists'; //拼团列表
import GroupStatistics from '../components/group/GroupStatistics'; //拼团统计


const routes = [
    {
        path :'/', /*登录页面*/
        component:Login,
        exact:true
    },{
        path:'/home', //主页
        component:Home,
        routes:[/*嵌套路由*/
            {
                path:'/home/',//会员管理
                component:MemberList
            },
            {
                path:'/home/goods',//商品管理
                component:GoodsManage
            },
            {
                path:'/home/order',//订单列表
                component:OrderLists
            },
            {
                path:'/home/class',//分类管理
                component:ClassLists
            },
            {
                path:'/home/dealers', //经销商管理
                component:DealersLists
            },
            {
                path: '/home/params',//参数设置
                component:ParamsSet
            },
            {
                path: '/home/banner', //广告设置
                component:BannerSet
            },
            {
                path: '/home/group', //拼团列表
                component:GroupLists
            },
            {
                path:'/home/groupstatistics', //拼团统计
                component:GroupStatistics
            }
        ]
    }
]


export default routes;



