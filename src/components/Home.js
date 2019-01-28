import React, { Component } from 'react';
import { Route  } from "react-router-dom";

import Lside from './Lside'

import '../assets/css/home.css'
class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            flag : false,
            username : ''
        }
    }
    componentDidMount() {
        document.addEventListener('click',(e)=>{
            if(e.target.className === "username"){
                this.setState({
                    flag : true
                })
            }else{
                this.setState({
                    flag : false
                })
            }
        })
        this.setState({
            username : window.sessionStorage.getItem('username') //获取用户名
        })
    }
    componentWillUnmount() {
        this.setState({
            flag : false,
            username : ''
        })
    }

    logout=()=>{//退出登录
        this.props.history.push('/')
    }
    render() {
        return (
            <div className="content">
                <header className="header">
                    <div className="logo">
                        <img src={require('../assets/images/logo.png')} alt=""/>
                    </div>
                    <div className="header-title">
                        <h3>点点臻选后台管理系统</h3>
                        <div className="header-user">
                            <p className="username">{this.state.username}</p>
                            {
                                this.state.flag ?
                                <ul>
                                    <li onClick={this.logout}>退出登录</li>
                                </ul> : ''
                            }
                        </div>
                    </div>
                </header>
                <div className="container">
                    <div className="left">
                        <Lside/>
                        {/* <ul>
                            <li>
                                <Link to="/home/">会员管理</Link>
                            </li>
                            <li>
                                <Link to="/home/goods">商品管理</Link>
                            </li>
                        </ul> */}
                    </div>
                    <div className="right">
                        {
                            this.props.routes.map((route,key)=>{
                                return <Route key={key} exact path={route.path} component={route.component} />
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default  Home;


