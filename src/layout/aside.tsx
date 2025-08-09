import { Divider, Flex, Layout, Menu, Button } from "antd";
import {
    InboxOutlined,
    CalendarOutlined,
    CheckCircleOutlined,
    DeleteOutlined,
    ClockCircleOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
    useCreateProjectMutation,
    useGetAllProjectsQuery,
} from "../service/project.service";
import { CreateProject } from "../components/project.create";
import { useState } from "react";
const { Sider } = Layout;
export const AsideApp = () => {
    const [createProjectState, setCreateProjectState] = useState(false);

    const showCreateProjectState = () => setCreateProjectState(true);
    const hideCreateProjectState = () => setCreateProjectState(false);

    const { data } = useGetAllProjectsQuery();

    const basicLink: MenuProps["items"] = [
        {
            key: "inbox",
            label: "Входящие",
            icon: <InboxOutlined />,
        },
        {
            key: "today",
            label: "Сегодня",
            icon: <CalendarOutlined />,
        },
        {
            key: "upcoming",
            label: "Предстоящие",
            icon: <ClockCircleOutlined />,
        },
        {
            key: "completed",
            label: "Завершённые",
            icon: <CheckCircleOutlined />,
        },
        {
            key: "trash",
            label: "Корзина",
            icon: <DeleteOutlined />,
        },
    ];
    return (
        <>
            <Sider width={200} style={{ backgroundColor: "#ffffff" }}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    defaultOpenKeys={["sub1"]}
                    items={basicLink}
                />

                <Flex
                    vertical={true}
                    style={{
                        paddingLeft: 24,
                        paddingRight: 12,
                    }}
                >
                    <Divider />
                    <Flex justify="space-between" align="center">
                        <span>Проекты</span>
                        <Button
                            size="small"
                            shape="circle"
                            type="text"
                            onClick={showCreateProjectState}
                        >
                            <PlusOutlined />
                        </Button>
                    </Flex>
                </Flex>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    defaultOpenKeys={["sub1"]}
                    items={basicLink}
                />
            </Sider>
            <CreateProject
                open={createProjectState}
                close={hideCreateProjectState}
            />
        </>
    );
};
