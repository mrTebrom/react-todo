import { Alert, Modal, Input, Form, message } from "antd";
import {
    useGetOneProjectQuery,
    useUpdateProjectMutation,
} from "../service/project.service";
import { useEffect, useState } from "react";

interface IProps {
    id: number | null;
    open: boolean;
    close: () => void;
}
export const EditProject = ({ open, id, close }: IProps) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [form] = Form.useForm();

    const { data } = useGetOneProjectQuery(id, {
        skip: !id,
    });

    const [update, { isLoading }] = useUpdateProjectMutation();

    const ok = async () => {
        try {
            const values = await form.validateFields();
            const response = await update({ ...values, id }).unwrap();
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

    useEffect(() => {
        form.setFieldsValue(data);
    }, [data]);
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
