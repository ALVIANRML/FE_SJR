import { Dropdown,Button, Col, Layout, Menu, Row, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";

import {  
  UserOutlined,
  AppstoreFilled,
  StockOutlined,
  ShoppingCartOutlined,
  WalletOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import axios, { Axios } from "axios";

const { Header, Content, Footer, Sider, AntOutlet } = Layout;

const itemsDropdown = [
  {
    key:"profile",
    label:"Profil Saya",
    icon:<UserOutlined/>
  },
  {
    type:"divider",
  },
  {
    key:"logout",
    label: "Keluar",
    icon:<LogoutOutlined/>,
    danger:true,
  }
];

const klikDropdown = ({key}) =>{
    if(key === "profile"){
      console.log("Buka Profil")
    }
    else if(key === "logout"){
      try{
        const token = localStorage.getItem("token")
        const response = await axios.post("https:/127.0.0.1:8000/api/logout",
          {},
          {
            
          }
        );
      }
    }
  }

const items = [
  {
    key: "1",
    icon: <AppstoreFilled />,
    label: (
      <Link to="/dashboard" style={{ fontFamily: "monospace" }}>
        Dashboard
      </Link>
    ),
  },
  {
    key: "2",
    icon: <StockOutlined />,
    label: <Link to="/stok">Stok</Link>,
  },
  {
    key: "3",
    icon: <ShoppingCartOutlined />,
    label: (
      <Link to="/tebusan" style={{ fontFamily: "monospace" }}>
        Tebusan
      </Link>
    ),
  },
  {
    key: "4",
    icon: <WalletOutlined />,
    label: (
      <Link to="/kredit-limit" style={{ fontFamily: "monospace" }}>
        {" "}
        Kredit Limit
      </Link>
    ),
  },
];
function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const currentYear = new Date().getFullYear();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width={200}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          height: "100vh",
          maxHeight: "100vh",
        }}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed) => {
          setCollapsed(collapsed);
          console.log(collapsed);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{
            position: "fixed",
            width:"100%",
            top: 0,
            left: collapsed ? 0 : 200,
            right: 0,
            zIndex: 1000,
            padding:"16px",
            background: "#182b55",
          }}>
            <div style={{ display:"flex",
            justifyContent:"flex-start",width:"85%"}}>
              <Dropdown menu={{
                items:itemsDropdown,
                onClick: klikDropdown,
              }}
              trigger={["click"]}
              placement="bottomRight"
              >
            <Button style={{borderRadius:"10px",padding:"10px",width:"10%", backgroundColor:"white", marginLeft:"auto"}}>
              <Row align="middle">
                <Col xs={6} sm={6} lg={6} xl={6}>
                <UserOutlined/>
                </Col>
                <Col xs={18} sm={18} lg={18} xl={18}>
                <div style={{padding:10}}>
                ADMIN
                </div>
                </Col>
              </Row>
        </Button>
              </Dropdown>
            </div>
        </Header>

        <Content
          style={{
            marginTop: 64, // tinggi header
            marginLeft: collapsed ? 0 : 200,
            padding: 24,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>

        <Footer style={{ textAlign: "center" }}>
          © 2026 PT. Samudra Jaya Raya. All Rights Reserved. Developed by
          Alvian.
        </Footer>
      </Layout>
    </Layout>
  );
}
export default MainLayout;
