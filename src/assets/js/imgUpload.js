import Axios from 'axios';

import { $url } from './axios';


// 图片上传公共方法
const uploadfile = function(options){
    let imgUrl = null;
    var input=document.createElement('input');
    input.type='file';
    input.accept='image/jpeg,image/png,image/jpg,image/gif';
    input.onchange=function(e){
        var fileInput=e.target;
        if(fileInput.files.length === 0){
            return;
        }
        const INDEX = fileInput.files[0].name.lastIndexOf('.');
        const fileType = fileInput.files[0].name.slice(INDEX,fileInput.files[0].name.length); //获取文件后缀名
        var newfile = new File([fileInput.files[0]], new Date().getTime()+fileType,{type:fileInput.files[0].type});
        if(newfile.size>1024*1024*1){
            alert('图片不能大于1M');
            return;
        }

        var reader = new FileReader(); //判断图片宽高是否符合规定的尺寸
        reader.onload = function(imgFile){
            var data = imgFile.target.result;
            var image = new Image();
            image.onload=function(){
               var width = image.width;
               var height = image.height;
                if(width !== options.IMG_WIDTH || height > options.IMG_HEIGHT){
                    alert(`图片尺寸为${options.IMG_WIDTH }*${options.IMG_HEIGHT}`);
                }else{
                    let config = {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                    var data = new FormData();
                    Axios.get($url.img_upload).then(function(res){     
                        if(res.data.result === 1){
                            // 添加配置参数
                            data.append('name',newfile.name);
                            data.append('key',res.data.body.dir+'${filename}');
                            data.append('policy', res.data.body.policy);              
                            data.append('OSSAccessKeyId', res.data.body.accessid);
                            data.append('success_action_status', 200); // 指定返回的状态码
                            data.append('callback',res.data.body.callback);
                            data.append('signature', res.data.body.signature);
                            data.append('file',newfile);
                            Axios.post(res.data.body.host,data,config).then(res=>{
                                // console.log(res.data)
                                if(res.data.result===1){
                                    options.success(res.data); //上传成功回调函数
                                }else{
                                    options.error(res.data.message);
                                    
                                }
                            }).catch(err=>{
                                console.log(err);
                                options.error('图片上传发生错误,请重新上传');
                            })
                        }else{
                            options.error(res.data.message);
                        }
                    })
                }
            };
            image.src = data;
            return imgUrl;
        }
        reader.readAsDataURL(fileInput.files[0]);        
        return imgUrl;
    };   
    input.click();
    
}

export {uploadfile}



