import React from "react";

import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Outlet } from "react-router-dom";
import { HeaderApp } from "./header";
import { AsideApp } from "./aside";

const { Content } = Layout;

export const LayoutApp: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const width: number = 200;

    return (
        <Layout style={{ height: "100vh" }}>
            <HeaderApp />
            <Layout>
                <AsideApp />
                <Layout style={{ padding: "0 24px 24px" }}>
                    <Breadcrumb
                        items={[
                            { title: "Home" },
                            { title: "List" },
                            { title: "App" },
                        ]}
                        style={{ margin: "16px 0" }}
                    />
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};
