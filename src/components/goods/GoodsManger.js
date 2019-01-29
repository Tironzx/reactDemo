import React, { Component } from 'react';

import { Button,Input,DatePicker } from 'antd';

import { $http , $url } from '../../assets/js/axios.js'


const { RangePicker } = DatePicker;

class GoodsManger extends Component{
    constructor(){
        super();

        this.state = {
            lists:[]
        }
    }
    componentDidMount(){
        this.getUserList();
    }
    getUserList=()=>{//获取会员列表
        let _this = this;
        $http({
            _this:_this,
            type:0,
            method:'get',
            data:{
                title:'',
                dealer_id:0,
                shelf_time_start:'',
                shelf_time_end:'',
                status:0,
                limit:20,
                page:1
            },
            url:$url.bak_api,
            api:'/products',
            success:function(data){
                console.log(data.product_list[0])
                _this.setState({
                    lists : data.product_list
                })
            },
            error:function(data){
               console.log(data)
            }
        });
    }
    startTime=()=>{

    }
    onChange=(value, dateString)=> {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }
    onOk=(value)=> {
        console.log('onOk: ', value);
    }
    render() {
        let  editStyle = {
            color:'#0a80da',
            cursor:'pointer'
        }
        return (
            <div>
                <h3 className="page-title"><a href="/home/goods">商品管理</a> &nbsp;>&nbsp;商品列表</h3>
                <ul className="search-switch">
                    <li>会员:&nbsp; <div style={{width:"200px"}}><Input placeholder="请输入会员昵称或电话号码" /></div></li>
                    <li>注册时间:&nbsp;
                        <DatePicker onChange={this.startTime} placeholder="请输入开始时间" />
                        &nbsp;-&nbsp;
                        <DatePicker onChange={this.startTime} placeholder="请输入结束时间" />
                    </li>
                    <li>
                        注册时间:&nbsp;
                        <RangePicker showTime={{ format: 'HH:mm' }}  format="YYYY-MM-DD HH:mm"  placeholder={['Start Time', 'End Time']} onChange={this.onChange}  onOk={this.onOk} />
                    </li>
                    {/* <li>
                        <input type="checkbox" v-model="is_buy" id="1" /><label for="1">已购买</label>
                    </li> */}
                    <li>
                    <Button type="primary">查询</Button>
                    </li>
                </ul>
                {/* 会员表格列表 */}
                <div style={{width:'100%'}}>
                    <table border="1" className="table">
                        <thead>
                            <tr>
                                <th>编号</th><th>商品名称</th><th>经销商</th><th>商品售价</th><th>进货价</th><th>状态</th><th>库存</th><th>销量</th><th>上架时间</th><th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.lists.map((value,key)=>{
                                    return (
                                        <tr key={key}>
                                            <td>{value.id}</td><td>{value.title}</td><td>{value.dealer}</td><td>{value.market_price}</td><td>{value.purchase_price}</td>
                                            <td>{value.status}</td><td>{value.stock}</td><td>{value.sell_num}</td><td>{value.shelf_time}</td>
                                            <td>
                                                <span style={editStyle}>编辑</span>&nbsp;&nbsp;
                                                <span style={editStyle}>上架</span>&nbsp;&nbsp;
                                                <span style={editStyle}>下架</span>&nbsp;&nbsp;
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default  GoodsManger;


