import { Divider, Flex, Layout, Menu, Button } from "antd";
import {
    InboxOutlined,
    CalendarOutlined,
    CheckCircleOutlined,
    DeleteOutlined,
    ClockCircleOutlined,
    PlusOutlined,
    FileOutlined,
    EditOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useGetAllProjectsQuery } from "../service/project.service";
import { CreateProject } from "../components/project.create";
import { useState } from "react";
import { DestroyProject } from "../components/project.delete";
import { EditProject } from "../components/project.edit";
import { Link } from "react-router-dom";
const { Sider } = Layout;
export const AsideApp = () => {
    const [createProjectState, setCreateProjectState] = useState(false);
    const showCreateProjectState = () => setCreateProjectState(true);
    const hideCreateProjectState = () => setCreateProjectState(false);

    const [destroyProjectState, setDestroyProjectState] = useState<{
        open: boolean;
        name: string | null;
        id: number | null;
    }>({
        open: false,
        name: null,
        id: null,
    });
    const showDestroyProjectState = (id: number, name: string) => {
        setDestroyProjectState({ open: true, id, name });
    };
    const hideDestroyProjectState = () => {
        setDestroyProjectState({
            open: false,
            name: null,
            id: null,
        });
    };

    const [updateProjectState, setUpdateProjectState] = useState<{
        open: boolean;
        id: number | null;
    }>({
        open: false,
        id: null,
    });
    const showUpdateProjectState = (id: number) => {
        setUpdateProjectState({ open: true, id });
    };
    const hideUpdateProjectState = () => {
        setUpdateProjectState({
            open: false,
            id: null,
        });
    };

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
    const projectLinks: MenuProps["items"] = data?.map((item) => ({
        label: (
            <Link style={{ color: "unset" }} to={"/project/" + item.id}>
                {item.name}
            </Link>
        ),
        key: item.id,
        icon: <FileOutlined />,
        children: [
            {
                icon: <DeleteOutlined />,
                key: `destroy-project-${item.id}`,
                label: (
                    <Button
                        type="text"
                        danger
                        size="small"
                        style={{ padding: 0 }}
                        onClick={() =>
                            showDestroyProjectState(item.id, item.name)
                        }
                    >
                        Удалить
                    </Button>
                ),
            },
            {
                icon: <EditOutlined />,
                key: `edit-project-${item.id}`,
                label: (
                    <Button
                        type="text"
                        danger={false}
                        size="small"
                        style={{
                            padding: 0,
                            color: "#faad14" /* warning color */,
                        }}
                        onClick={() => showUpdateProjectState(item.id)}
                    >
                        Изменить
                    </Button>
                ),
            },
        ],
    }));
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
                    mode="vertical"
                    defaultSelectedKeys={["1"]}
                    defaultOpenKeys={["sub1"]}
                    items={projectLinks}
                />
            </Sider>
            <CreateProject
                open={createProjectState}
                close={hideCreateProjectState}
            />
            <DestroyProject
                open={destroyProjectState.open}
                close={hideDestroyProjectState}
                id={destroyProjectState.id}
                name={destroyProjectState.name}
            />
            <EditProject
                open={updateProjectState.open}
                id={updateProjectState.id}
                close={hideUpdateProjectState}
            />
        </>
    );
};
