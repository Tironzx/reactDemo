import React, { Component } from 'react';

import '../assets/css/login.css'

import { $http , $url } from '../assets/js/axios.js'

import passwd from '../assets/images/passwd.png';
import user from '../assets/images/user.png'
class Login extends Component{
    constructor(props){
        super(props);

        this.state = {

        }
    }
    componentDidMount() {
        this.refs.user.focus();
    }

    Login=()=>{//登录
        let _this = this;
        let user = _this.refs.user.value; //用户名
        let passwd = _this.refs.passwd.value; //密码
        $http({
            _this:_this,
            type:0,
            method:'post',
            data:{
                username:user,
                password:passwd
            },
            url:$url.bak_api,
            api:'/user/login',
            success:function(data){
                sessionStorage.setItem('username',user);
                _this.props.history.push('/home/')
            },
            error:function(data){
               console.log(data)
            }
        });

    }
    Enter=(e)=>{//回车登录
        if(e.keyCode ===13){
            this.Login()
        }
    }
    render() {
        return (
            <div className="login">
                <div className="login-main">
                        <p className="login-title">贤若科技管理系统</p>
                        <div style={{padding:"30px"}}>
                            <ul className="user-info">
                                <li>
                                    <div>
                                        <img src={user} alt=""/>
                                    </div>
                                    <input type="text" ref="user" placeholder="用户名"/>
                                </li>
                                <li>
                                    <div><img src={passwd} alt=""/></div>
                                    <input type="password" ref="passwd" onKeyDown={this.Enter} placeholder="密码"/>
                                </li>
                                {/*<li class="keycode">*/}
                                    {/*<input type="text" placeholder="验证码" class="wx-user-code" v-model="code" />*/}
                                {/*</li> */}
                                {/*<li v-show="false" style={{color:"#ff0000"}}>用户名或密码错误</li>*/}
                            </ul>
                            <button className="user-info-submit" onClick={this.Login}>登录</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default  Login;