import React, { Component } from 'react';

import { Button,Input,DatePicker } from 'antd';

import { $http , $url } from '../../assets/js/axios.js'


const { RangePicker } = DatePicker;

class DealersLists extends Component{
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
                name:'',
                add_time_start:'',
                add_time_end:'',
                limit:20,
                page:1
            },
            url:$url.bak_api,
            api:'/dealers',
            success:function(data){
                // console.log(data)
                _this.setState({
                    lists : data.dealer_list
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
        let editStyle = {
            display: 'inline-block',
            height: '30px',
            lineHeight: '30px',
            padding: '0 18px',
            color: '#555',
            whiteSpace: 'nowrap',
            textAlign: 'center',
            fontSize: '14px',
            border: 'none',
            borderRadius: '2px',
            cursor: 'pointer',
            transition: 'all 1s',
            borderWidth:'1px',
            borderStyle:'solid',
            borderColor: '#c9c9c9'
        }
        return (
            <div>
               <h3 className="page-title"><a href="/home/dealers">经销商管理</a> &nbsp;>&nbsp;经销商列表</h3>
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
                                <th>编号</th><th>经销商名称</th><th>联系人</th><th>联系电话</th><th>联系地址</th><th>添加时间</th><th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.lists.map((value,key)=>{
                                    return (
                                        <tr key={key}>
                                            <td>{value.id}</td><td>{value.title}</td><td>{value.name}</td><td>{value.phone}</td><td>{value.address}</td>
                                            <td>{value.add_time}</td>
                                            <td>
                                                <span style={editStyle}>编辑</span>&nbsp;&nbsp;
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

export default DealersLists;