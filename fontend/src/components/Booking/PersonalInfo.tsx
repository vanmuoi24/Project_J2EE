import { Form, Input, Select } from "antd";
import { useEffect } from "react";

export default function PersonalInfo({ onFormReady }: { onFormReady?: (form: any) => void }) {
  const [form] = Form.useForm();

  // expose form to parent
  useEffect(() => {
    if (onFormReady) onFormReady(form);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

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
          rules={[
            { required: true, message: "Vui lòng nhập tuổi"},
            {
              validator: (_: any, value: any) => {
                const num = Number(value);
                if (Number.isNaN(num)) return Promise.reject(new Error("Tuổi không hợp lệ"));
                if (num < 18 || num >= 80) return Promise.reject(new Error("Tuổi phải lớn hơn hoặc bằng 18 và nhỏ hơn 70"));
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input type="number" placeholder="Nhập tuổi" />
        </Form.Item>

        <Form.Item
          label="Giới tính"
          name="gender"
          rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
        >
          <Select placeholder="Chọn giới tính">
            <Select.Option value="male">Nam</Select.Option>
            <Select.Option value="female">Nữ</Select.Option>
          </Select>
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
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại!" },
            {
              pattern: /^\d{10}$/, // exactly 10 digits
              message: "Số điện thoại phải đủ 10 chữ số",
            },
          ]}
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
