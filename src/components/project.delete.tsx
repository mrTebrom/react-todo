import { Modal, Typography } from "antd";
import { useDeleteProjectMutation } from "../service/project.service";

const { Paragraph, Title } = Typography;
interface IProps {
    open: boolean;
    close: () => void;
    name: string | null;
    id: number | null;
}
export const DestroyProject = ({ open, close, name, id }: IProps) => {
    const [destroy, { isLoading }] = useDeleteProjectMutation();

    const ok = async () => {
        if (id) {
            destroy(id);
            close();
        }
    };
    return (
        <Modal
            title={<span style={{ opacity: 0 }}>0</span>}
            open={open}
            onOk={ok}
            onCancel={close}
            okText="Удалить"
            cancelText="Отмена"
            cancelButtonProps={{ danger: true, type: "primary" }}
            okButtonProps={{ loading: isLoading }}
        >
            <Title level={4} style={{ textAlign: "center", marginBottom: 16 }}>
                Вы действительно хотите удалить проект «{name}»?
            </Title>
            <Paragraph
                style={{ textAlign: "center", color: "rgba(0,0,0,0.65)" }}
            >
                После удаления проекта будут удалены и все связанные с ним
                задачи. Это действие нельзя будет отменить.
            </Paragraph>
        </Modal>
    );
};
