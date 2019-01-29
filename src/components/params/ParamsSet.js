import React, { Component } from 'react';


import { $http , $url } from '../../assets/js/axios.js'

import { message } from 'antd';

class ParamsSet extends Component{
    constructor(){
        super();

        this.state = {
            cart_proportion : '', //购物车点豆比例
            earnings : '' //收益比例
        }
    }
    componentDidMount(){
        this.getDefaultParams();
    }
    getDefaultParams=()=>{
        let _this = this;
        $http({
            _this:_this,
            type:0,
            method:'get',
            data:{ },
            url:$url.bak_api,
            api:'/common/parameter',
            success:function(data){
                // console.log(data)
                _this.setState({
                    cart_proportion : data.point_bean_proportion,
                    earnings : data.income_proportion
                })
            },
            error:function(data){
               console.log(data)
            }
        });
    }
    getCartInput=(e)=>{//设置购物赠送点豆比例
        this.setState({
            cart_proportion : e.target.value 
        })
    }
    getEarnings=(e)=>{//设置收益比例
        this.setState({
            earnings : e.target.value 
        })
    }
    SaveParams=()=>{
        let _this = this;
        $http({
            _this:_this,
            type:0,
            method:'get',
            data:{
                point_bean_proportion : _this.state.cart_proportion,
                income_proportion : _this.state.earnings
            },
            url:$url.bak_api,
            api:'/common/parameter',
            success:function(data){
                // console.log(data)
                message.success('操作成功');
            },
            error:function(data){
               console.log(data)
            }
        });
    }
    render() {
        let borderStyle = {
            borderWidth:'1px',
            borderStyle:'solid',
            borderColor: '#ddd',
            borderRadius:'2px'
        }
        let button = {
            marginLeft : '17px',
            backgroundColor : '#4d5a6a',
            display : 'inline-block',
            height : '30px',
            lineHeight : '30px',
            padding : '0 18px',
            color : '#fff',
            whiteSpace : 'nowrap',
            textAlign : 'center',
            fontSize : '14px',
            border : 'none',
            borderRadius : '2px',
            cursor : 'pointer'
        }
        return (
            <div>
                <h3 className="page-title">参数设置</h3>
                <ul className="params-set">
                    <li>
                        <span>购物赠送点豆比例</span>:&nbsp;&nbsp; <input defaultValue={this.state.cart_proportion} style={borderStyle} onChange={this.getCartInput} />&nbsp;%
                    </li>
                    <li>
                        <span>收益比例</span>:&nbsp;&nbsp; <input defaultValue={this.state.earnings} onChange={this.getEarnings}  style={borderStyle} />&nbsp;%
                    </li>
                </ul>
                <span style={button} onClick={this.SaveParams}>保存</span>
            </div>
        );
    }
}

export default ParamsSet;