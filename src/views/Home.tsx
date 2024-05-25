import PeopleList from "../components/PeopleList";

import React from "react";
import {
  UserOutlined,
  EyeOutlined,
  RedditOutlined,
  PlaySquareOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import Filters from "../components/Filters";

const { Header, Content, Footer, Sider } = Layout;

function Home() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ width: "100%", minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu theme="dark" mode="horizontal" style={{ flex: 1, minWidth: 0 }} />
      </Header>
      <Content style={{ padding: "20px 40px 0 48px" }}>
        <Layout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Filters />
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <PeopleList />
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default Home;
