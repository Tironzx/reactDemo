import React, { Component } from 'react';
import { $http , $url } from '../../assets/js/axios.js'
import { uploadfile } from '../../assets/js/imgUpload.js'
import { message } from 'antd';


class BannerSet extends Component{
    constructor(){
        super();
        this.state = {
            bannerList:[]
        }
    }
    componentDidMount(){
        this.getBannerList();
    }
    getBannerList=()=>{
        let _this = this;
        $http({
            _this:_this,
            type:0,
            method:'get',
            data:{},
            url:$url.bak_api,
            api:'/ads',
            success:function(data){
                // console.log(data)
                _this.setState({
                    bannerList : data
                })
            },
            error:function(data){
               console.log(data)
            }
        });
    }

    setBannerUrl=(key,e)=>{
        let lists = this.state.bannerList;
        lists[key].target_url = e.target.value.trim();
        this.setState({
            bannerList : lists
        })
    }
    // 图片上传
    imgUpload=(key)=>{
        console.log(key)
        let _this = this;
        uploadfile({
            _this : _this,
            IMG_WIDTH:319,//图片宽度
            IMG_HEIGHT:408,//图片高度
            success:function(e){
                // console.log(e)
                let lists = _this.state.bannerList;
                lists[key].img_url = e.body.file_url;
                _this.setState({
                    bannerList : lists
                })
            },
            error:function(err){
                console.log(err)
            }
        })
    }

    saveBannerData=()=>{
        let _this = this;
        let flag = this.state.bannerList.find(e=>{ //如果上传了图片没有填链接，直接返回
            return e.img_url && !e.target_url;
        })
        if(flag){
            message.warning('链接地址必须输入');
        }else{
            $http({
                _this:_this,
                type:0,
                method:'post',
                data:_this.state.bannerList,
                url:$url.bak_api,
                api:'/ad',
                success:function(data){
                    // console.log(data)
                    message.success('保存成功');
                },
                error:function(data){
                   console.log(data)
                }
            });
        }
    }

    render() {
        return (
            <div>
                <h3 className="page-title"><a href="/home/banner">广告设置</a> &nbsp;>&nbsp;首页顶部广告图</h3>
                <div className="upload-describe">请上传顶部广告图片 <span style={{color:'#ff0000',fontSize:'14PX',marginRight:'10px'}}>(建议上传尺寸690*340)</span></div>
                <ul className="banner-list">
                    {
                        this.state.bannerList.map((value,key)=>{
                            return (
                                <li key={key}>
                                    <div className="upload-img-box">
                                        <span className="img-upload-btn" onClick={this.imgUpload.bind(this,key)}></span> 
                                        <div className="banner-box">
                                            <img src={value.img_url} alt=""/> 
                                            <span className="delete-img"></span>
                                        </div>
                                    </div>
                                    <p className="link">
                                        <span>链接地址:</span> 
                                        <input defaultValue={value.target_url} onChange={this.setBannerUrl.bind(this,key)} type="text" placeholder="请输入跳转地址"/>
                                    </p>
                                </li>
                            )
                        })
                    }
                </ul>
                <div style={{marginLeft:'17px'}}>
                    <span className="button" onClick={this.saveBannerData}>保存</span>
                </div>
            </div>
        );
    }
}

export default BannerSet;