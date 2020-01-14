//新生成newstate函数模块
//多个需要引入combinereducers

import {combineReducers} from 'redux';

function aaa(prevaState=111,action){
switch(action.type){
  default:
    return prevaState;
}

}


function bbb(prevaState=222,action){
  switch(action.type){
    default:
      return prevaState;
  }
  
  }


  export default combineReducers({
      aaa,
      bbb


  })