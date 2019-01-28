import React, { Component } from 'react';
import { Button,Input,DatePicker } from 'antd';

import { $http , $url } from '../../assets/js/axios.js'

import '../../assets/css/memberList.css';


const { RangePicker } = DatePicker;

class MemberList extends Component{
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
                keywords:'',
                reg_time_start:'',
                reg_time_end:'',
                is_buy:1,
                limit:20,
                page:1
            },
            url:$url.bak_api,
            api:'/users',
            success:function(data){
                console.log(data)
                _this.setState({
                    lists : data.user_list
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
        return (
            <div>
                <h3 className="page-title"><a href="/home">会员管理</a> &nbsp;>&nbsp;会员列表</h3>
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
                                <th>编号</th><th>昵称</th><th>电话号码</th><th>是否购买</th><th>购买次数</th><th>注册时间</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.lists.map((value,key)=>{
                                    return (
                                        <tr key={key}>
                                            <td>{key+1}</td><td>{value.nickname}</td><td>{value.cellphone}</td><td>{value.is_buy}</td><td>{value.buy_num}</td><td>{value.reg_time}</td>
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

export default  MemberList;


