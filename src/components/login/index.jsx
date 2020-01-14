import React, {Component}  from 'react';
import {Form,Input,Button,Icon,message} from 'antd';
import axios from 'axios';

import logo from './logo.png';
import './index.less';
import{Redirect} from 'react-router-dom';

class Login extends Component{
  validator=(rule,value,callback)=>{
    if(!value){
      callback('密码不能为空');}
      else if (value.length<4){
        callback('密码必须大于4位数');
      } else if (value.length>15){
        callback('密码必须小于15位数');

      }

      callback()
    };

    login=(e)=>{
          e.preventDefault();
          this.props.form.validateFields((err,values)=>{

            if(!err){
              const {username,password}=values;
              axios.post('http://localhost/:3000/api/login',(username,password))
              .then((response)=>{
                  if(response.data.status===0){
                      //登陆成功跳转到home页面，redirect
                      //编程式导航
                  this.props.history.replace('/');

                  }else{
                      message.error(response.data.msg);
                      this.props.form.resetFields(['password','username']);

                  }


                    console.log(response);
              })
              .catch((err)=>{
                console.log(err);
                message.error(response.data.msg);
                this.props.form.resetFields(['password']);



              })
            }
          })
    };
    
    render(){
      const {getFieldDecorator}=this.props.form;
        return (
        
        
        <div className='login'>
      
              <header className='login-header'>
      
                <img src={logo} alt="logo"/>
                <h1>React项目：后台管理系统</h1>
                </header>
                <section className='login-section'>
                  <h3>用户登录</h3>
                  <Form className='login-form' onSubmit={this.login}>
                        <Form.Item>
                        {getFieldDecorator('username', {
                  rules: [
                    { 
                      required: true, 
                      message: '用户名不能为空!' 
                    },{
                          min:4,
                          message:'用户名必须大于3位'
                    },
                    {
                          max:15,
                          message:'用户名必须小于15位'
                    },
                    {
                             pattern:/^\w$/,
                             message:'用户名只能包含英文,数字，下划线'     
      
      
                    }
                  ],
      
                  
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                  />,
                )}
                        
                        </Form.Item>
                        <Form.Item>
                        {getFieldDecorator(
                            'password',{
      
                              rules:[
      
                                {
                                  validator:this.validator
                                }
                              
                             ]
      
                        })(
      
                          <Input prefix={<Icon type="lock" />} placeholder='密码'/>
                        )}
                          
                        </Form.Item>
                        <Form.Item>
                          <Button className='login-btn' type='primary' htmlType='submit'>登录</Button>
                        </Form.Item>
                  </Form>
      
                </section>
        </div>
        
        );
      }
  };






//给login传递form属性
export default Form.create()(Login);