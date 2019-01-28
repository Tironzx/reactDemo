
import React, { Component } from 'react';

import { Link } from "react-router-dom";

import '../assets/css/lside.css';


class Lside extends Component{
    constructor(props){
        super(props);

        this.state = {
            lsideArray:[{
                name:'会员管理',
                img:require('../assets/images/member.png'),
                list:[{name:'会员管理',path:'/home/'}],
                show:false,
                isActive:false,//判断当前菜单是展开还是收缩
            },{
                name:'商品管理',
                img:require('../assets/images/goods_manage.png'),
                list:[{name:'商品管理',path:'/home/goods'}],
                show:false,
                isActive:false,
            },{
                name:'订单管理',
                img:require('../assets/images/order_manage.png'),
                list:[{name:'订单列表',path:'/home/order'}],
                show:false,
                isActive:false,
            },{
                name:'分类管理',
                img:require('../assets/images/class_sales.png'),
                list:[{name:'分类管理',path:'/home/class'}],
                show:false,
                isActive:false,
            },{
                name:'经销商管理',
                img:require('../assets/images/dealers.png'),
                list:[{name:'经销商管理',path:'/home/dealers'}],
                show:false,
                isActive:false,
            },{
                name:'参数设置',
                img:require('../assets/images/params_set.png'),
                list:[{name:'参数设置',path:'/home/params'}],
                show:false,
                isActive:false,
            },{
                name:'广告设置',
                img:require('../assets/images/banner.png'),
                list:[{name:'广告设置',path:'/home/banner'}],
                show:false,
                isActive:false,
            },{
                name:'拼团',
                img:require('../assets/images/spell_group.png'),
                list:[{name:'拼团列表',path:'/home/group'},{name:'拼团统计',path:'/home/groupstatistics'}],
                show:false,
                isActive:false,
            }]
        }
    }

    changeItem=(item,key)=>{
        let lists = this.state.lsideArray;
        lists.forEach(ele=>{
            if(ele.show !== lists[key].show){
                ele.show = false;
                ele.isActive = false;
            }
        })
        lists[key].show = !lists[key].show;
        lists[key].isActive = !lists[key].isActive;
        this.setState({
            lsideArray : lists
        })
    }
    render() {
        return (
            <div className="lside">
                <ul>
                    {
                        this.state.lsideArray.map((value,key)=>{
                            return (
                                <li key={key}>
                                        <div className="lside-list-title" onClick={this.changeItem.bind(this,value,key)}>
                                            <img src={value.img} alt="" />
                                            {value.name}
                                            <span className={value.isActive?'select-up':'select-down'}></span>
                                        </div>
                                        {
                                            value.show ? 
                                                        <ul className="item-menu">
                                                            {
                                                                value.list.map((item,keys)=>{
                                                                    return (
                                                                        <li key={keys}>
                                                                            <Link className="default-style" to={item.path}>{item.name}</Link>
                                                                        </li>
                                                                    )
                                                                })
                                                                
                                                            }
                                                        </ul> : ''
                                        }
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default Lside;



