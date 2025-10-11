import { Form, Input } from "antd";

export default function PersonalInfo({ onFormReady }: { onFormReady?: (form: any) => void }) {
  const [form] = Form.useForm();

  // expose form to parent
  if (onFormReady) onFormReady(form);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Thông tin cá nhân</h2>
      <Form
        form={form}
        layout="vertical"
        name="personalInfo"
        initialValues={{}}
        autoComplete="off"
      >
        <Form.Item
          label="Họ tên"
          name="fullName"
          rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
        >
          <Input placeholder="Nhập họ tên" />
        </Form.Item>

        <Form.Item
          label="Tuổi"
          name="age"
          rules={[{ required: true, message: "Vui lòng nhập tuổi!" }]}
        >
          <Input type="number" placeholder="Nhập tuổi" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>

        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
        >
          <Input.TextArea placeholder="Nhập địa chỉ" rows={2} />
        </Form.Item>
      </Form>
    </div>
  );
}
