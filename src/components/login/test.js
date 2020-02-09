import React from 'react';
//引入的实例，里面包含axios的默认配置
import axios from 'axios';
import {message} from 'antd';

let token='';
let id='';
export default function Test(){


  
  const axiosInstance=axios.create({
    //配置axios拦截器
    //是一个拦截请求/响应的函数
    //作用：作为请求拦截器：设置公共的请求头，
    //作为响应拦截器
  //axios有个方法axios.create({});创造个实例,自己创造实例可以修改配置
  //baseUrl,-基础路径,可以修改配置，后面所有请求路径以baseUrl开头
  //timeout:20000, 20s请求的超时时间，请求一旦超过10s没响应，就会自动中断请求

  })

  //设置拦截器，拦截器分为2种,每个拦截器对应2个函数，一个代表成功一个代表失败
  //请求拦截器-在发送请求前调用
  axiosInstance.interceptors.request.use(
    //代码成功(还没发送请求，成功传个config，config是个对象，里面包含所有请求的配置)
    //修改config配置
    //添加动态header参数
      (config)=>{
        //每次发请求前触发
      if(token){
        config.headers.authorization=`${token}`;
      }
        return config;
      },
      //代码失败(一般不会有问题，基本不写)
      (error)=>{
        return Promise.reject(error);
      }


  )
  
  //响应拦截器，返回响应之后，触发axiosinstance.then/catch之前
    axiosInstance.interceptors.response.use(
      response=>{
        return response.data
      }
          //请求/响应成功--2xx ，2开头成功
          //请求/响应失败--4xx 5xx  ，4  5开头
      // ()=>{},
      // ()=>{}

    )




  //定义方法,三个按钮对应三个事件
 const handleClick1=()=>{
   //axios直接调用传个对象
   axios({
      method:'POST',
      url:'/api/login',
      data:{
        username:'admin',
        password:'admin'
      }
   })
   .then(response=>{
     if(response.data.status===0){
      token=response.data.data.token;

      message.success('登陆成功');
     }else{

      message.error(response.data.msg);
     }
   })
   .catch(err=>{
    message.error('网络错误');
   })
 };
 const handleClick2=()=>{
   axios({
    method:'POST',
    url:'/api/category/add',
    data:{
          categoryName:'手机'
    },
    headers:{
      authorization:`Bearer ${token}`
    }
   })
   .then(response=>{
    if(response.data.status===0){

     message.success('添加成功');
    }else{

     message.error(response.data.msg);
    }
  })
  .catch(err=>{
   message.error('网络错误');
  })
};
 
 const handleClick3=()=>{
  axios({
    method:'POST',
    url:'/api/category/delete',
    data:{
          categoryId:id
    },
    headers:{
      authorization:`Bearer ${token}`
    }
   })
   .then(response=>{
    if(response.data.status===0){

     message.success('删除分类成功');
    }else{

     message.error(response.data.msg);
    }
  })
  .catch(err=>{
   message.error('网络错误');
  })
 };

    return (
      <div>
        <button onClick={handleClick1}>按钮一</button>  
        <button onClick={handleClick2}>按钮二</button> 
        <button onClick={handleClick3}>按钮三</button> 
      </div>
    )
  }

