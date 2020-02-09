import React,{Component} from 'react';
import{Card,Icon,Form,Input,Button,Select,InputNumber }from 'antd';
import './index.less';

const{Item}=Form;
const{Option}=Select;
export default class AddProduct extends Component{
render(){
  const formItemLayout = {
    //左边文字占的区域大小
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    //右边区域占的大小
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
return(
<Card title={
<div>
<Icon type='arrow-left' className=''go-back/>
添加商品
  </div>
}>



<Form {...formItemLayout}>
<Item label='商品名称'>
<input placeholder='请输入商品名称' />
</Item>
<Item label='商品描述'>
<input placeholder='请输入商品描述' />
</Item>
<Item label='商品分类'>
<Select defaultValue='1'>

<Option value='1'>111</Option>
<Option>222</Option>
<Option>333</Option>


</Select>
</Item>
<Item label='商品价格'>
<InputNumber
      formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      parser={value => value.replace(/\$\s?|(,*)/g, '')}
      classNAME='product-price'
    />

</Item>
<Item label='商品详情'>
</Item>
<Button type='primary'>提交</Button>

</Form>
  </Card>


)


}



}
