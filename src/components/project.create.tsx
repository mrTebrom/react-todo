import { Alert, Form, Input, message, Modal } from "antd";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useCreateProjectMutation } from "../service/project.service";
import { useState } from "react";

interface IProps {
    open: boolean;
    close: () => void;
}
export const CreateProject = ({ open, close }: IProps) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const [create, { isLoading }] = useCreateProjectMutation();
    const ok = async () => {
        try {
            const values = await form.validateFields();
            const response = await create(values).unwrap();
            form.resetFields();
            messageApi.open({
                type: "success",
                content: response.message,
            });
            setErrorMessage(null);
            close();
        } catch (error) {
            if (error.status == 400) {
                console.log(error, 400);
                messageApi.open({
                    type: "error",
                    content: error.data.message,
                });
                setErrorMessage(error.data.message);
            }
        }
    };
    return (
        <>
            {contextHolder}

            <Modal
                open={open}
                onCancel={close}
                onOk={ok}
                title="Новый проект"
                okText="Создать"
                cancelText="Отмена"
                cancelButtonProps={{ danger: true, type: "primary" }}
                okButtonProps={{ loading: isLoading }}
                confirmLoading={isLoading}
            >
                {errorMessage ? (
                    <Alert message={errorMessage} type="error" showIcon />
                ) : null}
                <Form layout="vertical" name="create-project" form={form}>
                    <Form.Item
                        name="name"
                        label="Название проекта"
                        rules={[
                            {
                                required: true,
                                message: "Пожалуйста введите название проекта",
                            },
                        ]}
                    >
                        <Input placeholder="Пожалуйста введите название проекта" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
