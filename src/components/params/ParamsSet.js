import React, { Component } from 'react';

class ParamsSet extends Component{
    constructor(){
        super();

        this.state = {
            name : '张学友',
            userinfo : {
                username :'张国荣'
            }
        }
    }
    render() {
        return (
            <div>
                <h2>参数设置</h2>
                <div>组件内容</div>
                <p>{this.state.name}</p>
                <div>{this.state.userinfo.username}</div>
            </div>
        );
    }
}

export default ParamsSet;