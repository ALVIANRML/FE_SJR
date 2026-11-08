import {
  Button,
  Drawer,
  Dropdown,
  Grid,
  Layout,
  Menu,
  Space,
  theme,
} from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  UserOutlined,
  AppstoreFilled,
  StockOutlined,
  ShoppingCartOutlined,
  WalletOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
 
const { Header, Content, Footer, Sider } = Layout;
const { useBreakpoint } = Grid;
 
// ====== SESUAIKAN DI SINI ======
const APP_NAME = "Nama Aplikasi"; // ganti dengan nama aplikasi kamu
const APP_LOGO = "/logo.png"; // taruh file logo di folder /public
// ===============================
 
const SIDER_WIDTH = 220;
const SIDER_COLLAPSED_WIDTH = 80;
const HEADER_HEIGHT = 64;
const NAVY = "#182b55";
 
const menuItems = [
  {
    key: "/dashboard",
    icon: <AppstoreFilled />,
    label: <Link to="/dashboard">Dashboard</Link>,
  },
  {
    key: "/stok",
    icon: <StockOutlined />,
    label: <Link to="/stok">Stok</Link>,
  },
  {
    key: "/tebusan",
    icon: <ShoppingCartOutlined />,
    label: <Link to="/tebusan">Tebusan</Link>,
  },
  {
    key: "/kredit-limit",
    icon: <WalletOutlined />,
    label: <Link to="/kredit-limit">Kredit Limit</Link>,
  },
];
 
const dropdownItems = [
  { key: "profile", label: "Profil Saya", icon: <UserOutlined /> },
  { type: "divider" },
  { key: "logout", label: "Keluar", icon: <LogoutOutlined />, danger: true },
];
 
const clearSessionAndRedirect = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};
 
const handleDropdownClick = async ({ key }) => {
  if (key === "profile") {
    console.log("Buka Profil");
    return;
  }
 
  if (key === "logout") {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      if (response.status === 200) clearSessionAndRedirect();
    } catch (error) {
      // `response` tidak ada di scope catch, ambil dari error.response
      const status = error?.response?.status;
      console.error("Logout gagal:", error?.response?.data || error?.message);
      console.error("Logout Status:", status);
      // Token sudah tidak valid -> tetap keluarkan user
      if (status === 401) clearSessionAndRedirect();
    }
  }
};
 
function Brand({ collapsed = false, onClick }) {
  return (
    <Link
      to="/dashboard"
      onClick={onClick}
      style={{
        height: HEADER_HEIGHT,
        display: "flex",
        alignItems: "center",
        justifyContent: collapsed ? "center" : "flex-start",
        gap: 12,
        padding: collapsed ? 0 : "0 20px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      <img
        src={APP_LOGO}
        alt={`Logo ${APP_NAME}`}
        style={{
          width: 36,
          height: 36,
          objectFit: "contain",
          borderRadius: 8,
          background: "#fff",
          padding: 3,
          flexShrink: 0,
        }}
      />
      {!collapsed && (
        <span
          style={{
            color: "#fff",
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: 0.2,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {APP_NAME}
        </span>
      )}
    </Link>
  );
}
 
function MainLayout() {
  const screens = useBreakpoint();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
 
  // Breakpoint: mobile < 768, tablet 768-991, laptop >= 992
  const isMobile = !screens.md;
  const isLaptop = !!screens.lg;
 
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
 
  // Tablet -> sidebar ringkas (ikon saja), laptop -> sidebar penuh
  useEffect(() => {
    setCollapsed(!isLaptop);
  }, [isLaptop]);
 
  // Tutup drawer saat berpindah ke layar besar
  useEffect(() => {
    if (!isMobile) setDrawerOpen(false);
  }, [isMobile]);
 
  const siderWidth = isMobile
    ? 0
    : collapsed
    ? SIDER_COLLAPSED_WIDTH
    : SIDER_WIDTH;
 
  // Cocokkan menu aktif dengan URL (termasuk sub-route)
  const selectedKey =
    menuItems.find((item) => location.pathname.startsWith(item.key))?.key ||
    "";
 
  const currentYear = new Date().getFullYear();
 
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar tablet & laptop */}
      {!isMobile && (
        <Sider
          width={SIDER_WIDTH}
          collapsedWidth={SIDER_COLLAPSED_WIDTH}
          collapsed={collapsed}
          trigger={null}
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            height: "100vh",
            overflowY: "auto",
            zIndex: 1100,
          }}
        >
          <Brand collapsed={collapsed} />
          <Menu
            theme="dark"
            mode="inline"
            items={menuItems}
            selectedKeys={[selectedKey]}
            style={{ borderInlineEnd: 0, paddingTop: 8 }}
          />
        </Sider>
      )}
 
      {/* Sidebar mobile (Drawer) */}
      {isMobile && (
        <Drawer
          placement="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          closable={false}
          width={SIDER_WIDTH + 20}
          styles={{
            body: { padding: 0, background: "#001529" },
            header: { display: "none" },
          }}
        >
          <Brand onClick={() => setDrawerOpen(false)} />
          <Menu
            theme="dark"
            mode="inline"
            items={menuItems}
            selectedKeys={[selectedKey]}
            onClick={() => setDrawerOpen(false)}
            style={{ borderInlineEnd: 0, paddingTop: 8 }}
          />
        </Drawer>
      )}
 
      <Layout
        style={{
          marginLeft: siderWidth,
          transition: "margin-left 0.2s",
          minWidth: 0,
        }}
      >
        <Header
          style={{
            position: "fixed",
            top: 0,
            left: siderWidth,
            right: 0,
            height: HEADER_HEIGHT,
            zIndex: 1000,
            padding: isMobile ? "0 12px" : "0 24px",
            background: NAVY,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "left 0.2s",
          }}
        >
          {/* Tombol buka/tutup sidebar */}
          <Button
            type="text"
            aria-label="Menu"
            icon={
              isMobile ? (
                <MenuOutlined />
              ) : collapsed ? (
                <MenuUnfoldOutlined />
              ) : (
                <MenuFoldOutlined />
              )
            }
            onClick={() =>
              isMobile ? setDrawerOpen(true) : setCollapsed((c) => !c)
            }
            style={{ color: "#fff", fontSize: 18, width: 44, height: 44 }}
          />
 
          {/* Menu user */}
          <Dropdown
            menu={{ items: dropdownItems, onClick: handleDropdownClick }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Button
              style={{
                borderRadius: 10,
                height: 40,
                padding: isMobile ? "0 12px" : "0 16px",
                backgroundColor: "#fff",
              }}
            >
              <Space size={8}>
                <UserOutlined />
                {!isMobile && <span>ADMIN</span>}
              </Space>
            </Button>
          </Dropdown>
        </Header>
 
        <Content
          style={{
            marginTop: HEADER_HEIGHT,
            padding: isMobile ? 12 : isLaptop ? 24 : 16,
            background: colorBgContainer,
            minHeight: `calc(100vh - ${HEADER_HEIGHT}px - 70px)`,
            overflowX: "auto",
          }}
        >
          <Outlet />
        </Content>
 
        <Footer
          style={{
            textAlign: "center",
            padding: isMobile ? "16px 12px" : "20px 24px",
            fontSize: isMobile ? 12 : 14,
          }}
        >
          © {currentYear} PT. Samudra Jaya Raya. All Rights Reserved.
          {" "}Developed by Alvian.
        </Footer>
      </Layout>
    </Layout>
  );
}
 
export default MainLayout;
 