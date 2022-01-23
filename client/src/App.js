
import { BrowserRouter as Router, Routes, Route,Link, useNavigate } from "react-router-dom";
import LoginPage from "./components/views/LoginPage/LoginPage";
import LandingPage from "./components/LandingPage/LandingPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from './hoc/auth'
import './App.css';
import { PageHeader,Layout, Menu, Breadcrumb,Button } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Writebooks from "./components/Writebook/Writebooks";
import BookList from "./components/Writebook/Booklist";


const { SubMenu } = Menu;
const { Sider, Content,Footer } = Layout;

function App() {


  

  //리액트 라우터 돔 v6에서는 새로 변수를 지정해서 컴포넌트를 집어 넣어주자
  const NewBooklist = Auth(BookList,null);
  const NewWritebooks = Auth(Writebooks,true)
  const NewLandingPage = Auth(LandingPage,null)
  const NewLoginPage =Auth(LoginPage,false)
  const NewLRegisterPage =Auth(RegisterPage,false)
  const [isLogin,setIsLogin] =useState(false)


  useEffect(() => {
    if(sessionStorage.getItem('user_id') === null){
    // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 없다면
    } else {
    // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 있다면
    // 로그인 상태 변경
      setIsLogin(true)

    }
  })

  const logoutHandler=()=>{
    axios.get('/api/users/logout').then
    (response=>{
        if(response.data.success){
          
            alert("로그아웃 완료")
            console.log(response.data)
            sessionStorage.clear()
            document.location.href='/'
        }else{
            alert("로그아웃을 실패 했습니다")
        }
    
})
}

  const a = sessionStorage.getItem('user_id');

  return (       
    <div className="App">
        <Layout>
        <PageHeader
      className="site-page-header"
      onBack={() => window.history.back()}
      title="너의 365장"
      subTitle="당신의 글이 작품이 되는 공간"

      extra={[
        isLogin? <Button key="1" type="primary" onClick={logoutHandler}>
        Logout
    </Button>:<Button key="2" type="primary" href="/login">
        Login
      </Button>
      ]}
    />
    <Content style={{ padding: '0 50px' }}>
    <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href='/getList'>List</Breadcrumb.Item>
        <Breadcrumb.Item href='/admin'>App</Breadcrumb.Item>
      </Breadcrumb>   
      <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
        <Sider className="site-layout-background" width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="나의 글">
              <Menu.Item key="1">글쓰기</Menu.Item>
              <Menu.Item key="2">option2</Menu.Item>
              <Menu.Item key="3">option3</Menu.Item>
              <Menu.Item key="4">option4</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="사람들의 글">
              <Menu.Item key="5">option5</Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<NotificationOutlined />} title="공지사항">
              <Menu.Item key="9">ReadMe</Menu.Item>
   
            </SubMenu>
          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>`환영합니다 {a}님`
        <Router>
        <Routes>
          <Route path="/" element={<NewLandingPage/>} />
          <Route path="/login" element={<NewLoginPage/>} />
          <Route path="/register" element={<NewLRegisterPage/>} />
          <Route path="/uploadbook" element={<NewWritebooks/>} />
          <Route path="/getList" element={<NewBooklist/>} />
        </Routes>
         </Router>
        </Content>
      </Layout>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Making Project TO Kwengwoo's portfolio </Footer>
  </Layout>
      

           

    </div>

  );
}

export default App;
