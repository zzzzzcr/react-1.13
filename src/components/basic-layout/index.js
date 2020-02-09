import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { Layout, Breadcrumb, } from 'antd';
import LeftNav from './left-nav';
import logo from '../../assets/./logo.png';
import './index.less';
import HeaderMain from './header-main';
import { FormattedMessage } from 'react-intl';


const { Header, Content, Footer, Sider } = Layout;


export default class BasicLayout extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    this.setState({
        collapsed,
    });
  };

  render() {
        const{isDisplay,collapsed}=this.state;    
        const {children}=this.props;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="layout-logo" >
            <img src={logo} alt='logo'/>
            <h1><FormattedMessage  id='title' /></h1>
            </div>
            <LeftNav />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 ,height:80}} />
          <HeaderMain />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>{children}</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}

