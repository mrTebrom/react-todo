import { Modal, Form, Input, message } from "antd";
import { useCreateTaskMutation } from "../service/project.service copy";

interface IProps {
    open: boolean;
    close: () => void;

    projectId: string | undefined;
}
export const CreateTask = ({ open, close, projectId }: IProps) => {
    const [form] = Form.useForm();
    const [create, { isLoading }] = useCreateTaskMutation();
    const ok = async () => {
        const values = await form.validateFields();
        await create({ ...values, projectId });
        close();
    };
    return (
        <>
            <Modal
                open={open}
                title="Новая задача"
                onCancel={close}
                onOk={ok}
                okText="Создать задачу"
                cancelText="Отмена"
                okButtonProps={{ loading: isLoading }}
            >
                <Form
                    layout="vertical"
                    name="create-task"
                    onFinish={ok}
                    form={form}
                >
                    <Form.Item name="title" label="Задача">
                        <Input placeholder="Введите задачу" />
                    </Form.Item>
                    <Form.Item name="description" label="Описание">
                        <Input.TextArea placeholder="Описание задачи" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
