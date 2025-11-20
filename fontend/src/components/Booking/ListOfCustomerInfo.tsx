import { useRef } from 'react';
import { Form, Input, DatePicker, Select, Row, Col, Button, Divider, Typography } from 'antd';

const { Title } = Typography;
const { Option } = Select;

export default function ListOfCustomerInfo({
  onFormReady,

  onCustomersChange,
}: {
  onFormReady?: (form: any) => void;
  /** optional getter function provided by parent to read personal info form values */
  personalFormGetter?: () => any;
  /** notify parent when customers change */
  onCustomersChange?: (customers: any[]) => void;
}) {
  const [form] = Form.useForm();
  // expose to parent
  if (onFormReady) onFormReady(form);
  const idCounter = useRef(1);

  const addCustomer = (type: 'adult' | 'child' | 'baby') => {
    const customers = form.getFieldValue('customers') || [];
    idCounter.current += 1;
    const newItem = {
      id: idCounter.current,
      type,
      fullName: '',
      gender: undefined,
      birthDate: null,
      address: '',
    };
    form.setFieldsValue({ customers: [...customers, newItem] });
  };

  // // add default customer from personal info as first adult
  // const addDefaultCustomer = () => {
  //   const personal = personalFormGetter ? personalFormGetter() : null;
  //   const customers = form.getFieldValue("customers") || [];
  //   if (!personal) return;
  //   idCounter.current += 1;
  //   const item = {
  //     id: idCounter.current,
  //     type: "adult",
  //     fullName: personal.fullName || "",
  //     gender: personal.gender || undefined,
  //     birthDate: personal.birthDate || null,
  //     address: personal.address || personal?.address || "",
  //   };
  //   form.setFieldsValue({ customers: [item, ...customers] });
  // };

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        name="list_of_customers"
        onValuesChange={() => {
          if (onCustomersChange) onCustomersChange(form.getFieldValue('customers') || []);
        }}
      >
        <Title level={4}>Hành khách</Title>

        {/* Add buttons */}
        <Row gutter={16} className="mb-6">
          <Col span={8}>
            <div className="flex justify-between items-center rounded p-2">
              <div>
                <p className="font-medium">Người lớn</p>
                <p className="text-xs text-gray-500">Từ 12 tuổi trở lên</p>
              </div>
              <Button type="primary" onClick={() => addCustomer('adult')}>
                + Thêm
              </Button>
            </div>
          </Col>
          <Col span={8}>
            <div className="flex justify-between items-center rounded p-2">
              <div>
                <p className="font-medium">Trẻ em</p>
                <p className="text-xs text-gray-500">Từ 2 - 11 tuổi</p>
              </div>
              <Button type="primary" onClick={() => addCustomer('child')}>
                + Thêm
              </Button>
            </div>
          </Col>
          <Col span={8}>
            <div className="flex justify-between items-center rounded p-2">
              <div>
                <p className="font-medium">Em bé</p>
                <p className="text-xs text-gray-500">Dưới 2 tuổi</p>
              </div>
              <Button type="primary" onClick={() => addCustomer('baby')}>
                + Thêm
              </Button>
            </div>
          </Col>
        </Row>

        <Divider />

        <Title level={5}>Thông tin hành khách</Title>

        <Form.List name="customers">
          {(fields, { remove }) => (
            <>
              {fields.length === 0 && (
                <p style={{ color: '#888' }}>Chưa có hành khách nào được thêm.</p>
              )}

              {fields.map(({ key, name, ...restField }, index) => (
                <div
                  key={key}
                  style={{ marginBottom: 24, borderBottom: '1px solid #eee', paddingBottom: 16 }}
                >
                  <Row gutter={16} align="middle">
                    <Col span={20}>
                      <p className="font-bold mb-2">
                        {index + 1}.{' '}
                        <Form.Item {...restField} name={[name, 'type']} noStyle>
                          <>{/* will render type label via value */}</>
                        </Form.Item>
                        <span>
                          {form.getFieldValue(['customers', name, 'type']) === 'adult'
                            ? 'Người lớn'
                            : form.getFieldValue(['customers', name, 'type']) === 'child'
                              ? 'Trẻ em'
                              : 'Em bé'}
                        </span>
                      </p>
                    </Col>
                    <Col span={4} className="text-right">
                      <Button type="link" danger onClick={() => remove(name)}>
                        Xóa
                      </Button>
                    </Col>

                    <Col span={6}>
                      <Form.Item
                        {...restField}
                        name={[name, 'fullName']}
                        label="Họ tên"
                        rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                      >
                        <Input placeholder="Nhập họ tên" />
                      </Form.Item>
                    </Col>

                    <Col span={6}>
                      <Form.Item
                        {...restField}
                        name={[name, 'gender']}
                        label="Giới tính"
                        rules={[{ required: true, message: 'Chọn giới tính' }]}
                      >
                        <Select placeholder="Chọn giới tính">
                          <Option value="male">Nam</Option>
                          <Option value="female">Nữ</Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={6}>
                      <Form.Item
                        {...restField}
                        name={[name, 'birthDate']}
                        label="Ngày sinh"
                        rules={[{ required: true, message: 'Chọn ngày sinh' }]}
                      >
                        <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>

                    <Col span={6}>
                      <Form.Item {...restField} name={[name, 'address']} label="Địa chỉ">
                        <Input placeholder="Nhập địa chỉ" />
                      </Form.Item>
                    </Col>

                    {/* Hidden type field so type persists */}
                    <Form.Item {...restField} name={[name, 'type']} hidden initialValue="adult">
                      <Input />
                    </Form.Item>
                  </Row>
                </div>
              ))}
            </>
          )}
        </Form.List>

        {/* helper: if parent wants to ensure first customer exists, they can call this exposed method via ref */}

        <Divider />

        <Title level={5}>Ghi chú</Title>
        <Form.Item name="note">
          <Input.TextArea
            rows={3}
            placeholder="Vui lòng nhập nội dung lời nhắn bằng tiếng Việt hoặc tiếng Anh"
          />
        </Form.Item>
      </Form>
    </div>
  );
}
