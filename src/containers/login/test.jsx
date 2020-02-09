import React from 'react';
// 引入axios是Axios的实例，里面包含axios默认配置
import axios from 'axios';
import { message } from 'antd';

export default function Test() {
  // 配置axios拦截器

  /*
    拦截器：
      是一个拦截请求/响应的函数
      作用：
        作为请求拦截器：设置公共的请求头 / 参数...
        作为响应拦截器：
      执行流程；
        1. 执行请求拦截器函数
        2. 发送请求
        3. 执行响应拦截器函数（接受到了响应）
        4. 执行 axiosInstance().then()/catch() 

    axios发送POST请求，
      默认的content-type： application/json 请求体是json
      有可能发送POST请求，需要的Content-type是 application/x-www-form-urlencoded

  */

  // 自己创建axios实例，可以修改axios默认配置
  const axiosInstance = axios.create({
    baseURL: '/api', // 基础路径（公共路径）: 后面所有请求路径都会以 baseURL 开头
    timeout: 20000, // 20s: 请求超时时间: 请求一旦超过10s还没有响应，就会自动中断请求
    headers: {
      // 公共的请求头
      // 参数必须写死
    }
  });

  // 设置拦截器
  // 请求拦截器(在发送请求之前调用)
  axiosInstance.interceptors.request.use(
    // 设置发送请求，代码成功（还没有发送请求）
    config => {
      // config是一个对象，里面包含所有发送请求的配置
      // 修改config配置
      // 添加动态headers参数

      // console.log(config);
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }

      /*
        看接口是否是必须使用'application/x-www-form-urlencoded'发送请求
      */
      if (config.method === 'post') {
        // 修改请求参数
        /*
        {
          username: 'admin',
          password: 'admin'
        }
          --->  'username=admin&password=admin'
        */
        // ['username', 'password']
        const keys = Object.keys(config.data);
        const data = keys
          .reduce((prev, curr) => {
            prev += `&${curr}=${config.data[curr]}`;
            return prev;
          }, '')
          .slice(1);
        config.data = data;
        config.headers['content-type'] = 'application/x-www-form-urlencoded';
      }

      return config;
    }
    // 设置发送请求，代码失败
    // 一般是不会有问题的，所以这个函数没啥用
    /* (error) => {
      // error失败的原因
      // 返回一个失败的promise对象
      return Promise.reject(err);
    } */
  );

  /*
      [request.fulfilled, request.rejected, dispatchRequest, undefined, response.fulfilled, response.rejected]

      promise.then(
        request.fulfilled, // 第一个回调
        request.rejected 
      )

      [dispatchRequest, undefined, response.fulfilled, response.rejected]

      promise.then(
        dispatchRequest,
        undefined
      )

      [response.fulfilled, response.rejected]

      promise.then(
        response.fulfilled,
        response.rejected
      )
       
      return promise
    */

  // 响应拦截器(返回响应之后，触发axiosInstance.then/catch之前调用)
  /*
    统一处理错误
  */
  axiosInstance.interceptors.response.use(
    // 请求/响应成功 --> 2xx
    response => {
      if (response.data.status === 0) {
        return response.data.data;
      } else {
        // 功能失败
        return Promise.reject(response.data.msg);
      }
    },
    // 请求/响应失败 --> 4xx 5xx
    err => {
      /*
        Network Error 网络错误  err.message
        err.response.status === 401  / err.message 401  没有token/token有问题
        "timeout of 10ms exceeded" err.message  请求超时

        根据不同的错误，返回不同的错误提示
      */
      // console.log('响应拦截器失败回调触发了~');
      // console.dir(err);

      const errCode = {
        401: '没有权限访问当前接口',
        403: '禁止访问当前接口',
        404: '当前资源未找到',
        500: '服务器发生未知错误，请联系管理员'
      };

      let errMessage = '';

      if (err.response) {
        // 说明接受到了响应，响应是失败的响应
        // 根据响应状态码判断错误 401 403 404 500
        errMessage = errCode[err.response.status];
      } else {
        // 说明没有接受到响应，请求就失败了

        if (err.message.indexOf('Network Error') !== -1) {
          errMessage = '网络连接失败，请重连网络试试~';
        } else if (err.message.indexOf('timeout') !== -1) {
          errMessage = '网络超时，请连上wifi重试~';
        }
      }

      return Promise.reject(errMessage || '发生未知错误，请联系管理员');
    }
  );

  let token = '';
  let id = '';

  const handleClick1 = () => {
    axiosInstance({
      method: 'POST',
      url: '/login',
      data: {
        username: 'admin',
        password: 'admin'
      }
      // data: 'username=admin&password=admin',
      /* headers: {
        'content-type': 'application/x-www-form-urlencoded'
      } */
    })
      .then(response => {
        console.log(response);

        /* if (response.data.status === 0) {
          token = response.data.data.token;
          message.success('登录成功');
        } else {
          message.error(response.data.msg);
        } */
      })
      .catch(err => {
        console.log(err);
        message.error(err);
      });
  };

  const handleClick2 = () => {
    axiosInstance({
      method: 'POST',
      url: '/category/add',
      data: {
        categoryName: '手机'
      }
      /* headers: {
        authorization: `Bearer ${token}`
      } */
    })
      .then(response => {
        if (response.data.status === 0) {
          id = response.data.data._id;
          message.success('添加成功');
        } else {
          message.error(response.data.msg);
        }
      })
      .catch(err => {
        console.log(err);
        message.error(err);
      });
  };

  const handleClick3 = () => {
    axiosInstance({
      method: 'POST',
      url: '/category/delete',
      data: {
        categoryId: id
      }
      /* headers: {
        authorization: `Bearer ${token}`
      } */
    })
      .then(response => {
        if (response.data.status === 0) {
          message.success('删除分类成功');
        } else {
          message.error(response.data.msg);
        }
      })
      .catch(err => {
        console.log(err);
        message.error('网络错误');
      });
  };

  return (
    <div>
      <button onClick={handleClick1}>按钮1</button>
      <button onClick={handleClick2}>按钮2</button>
      <button onClick={handleClick3}>按钮3</button>
    </div>
  );
}

/* export default function Test() {

  let token = '';
  let id = '';

  const handleClick1 = () => {
    axios({
      method: 'POST',
      url: '/api/login',
      data: {
        username: 'admin',
        password: 'admin'
      }
    })
      .then(response => {
        if (response.data.status === 0) {
          token = response.data.data.token;
          message.success('登录成功');
        } else {
          message.error(response.data.msg);
        }
      })
      .catch(err => {
        console.log(err);
        message.error('网络错误');
      });
  };

  const handleClick2 = () => {
    axios({
      method: 'POST',
      url: '/api/category/add',
      data: {
        categoryName: '手机'
      },
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.data.status === 0) {
          id = response.data.data._id;
          message.success('添加成功');
        } else {
          message.error(response.data.msg);
        }
      })
      .catch(err => {
        console.log(err);
        message.error('网络错误');
      });
  };

  const handleClick3 = () => {
    axios({
      method: 'POST',
      url: '/api/category/delete',
      data: {
        categoryId: id
      },
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.data.status === 0) {
          message.success('删除分类成功');
        } else {
          message.error(response.data.msg);
        }
      })
      .catch(err => {
        console.log(err);
        message.error('网络错误');
      });
  };

  return (
    <div>
      <button onClick={handleClick1}>按钮1</button>
      <button onClick={handleClick2}>按钮2</button>
      <button onClick={handleClick3}>按钮3</button>
    </div>
  );
} */
