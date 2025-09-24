import { Modal, Form, Input } from "antd";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface ModelEditProps {
  openEdit: boolean;
  setOpenEdit: (open: boolean) => void;
  editingUser: User | null;
}

const ModelEdit = ({ openEdit, setOpenEdit, editingUser }: ModelEditProps) => {
  return (
    <div>
      <Modal
        title="Chỉnh sửa người dùng"
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        onOk={() => setOpenEdit(false)}
        destroyOnClose
        maskClosable={false}
        centered
        getContainer={false}
        mask={true}
        maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <Form layout="vertical" initialValues={editingUser || {}}>
          <Form.Item label="Họ và tên" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Vai trò" name="role">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ModelEdit;
