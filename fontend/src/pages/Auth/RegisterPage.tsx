<<<<<<< HEAD
import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Form, Input, Card, Typography } from "antd"
=======
import SubNavbar from "@/components/Share/SubNavbar"
import { registerService } from "@/services/authServices"
import { LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Form, Input, Card, Typography, Checkbox, message } from "antd"
>>>>>>> 01a2cac
import { useNavigate } from "react-router-dom"

export default function RegisterPage() {
  const navigate = useNavigate()

<<<<<<< HEAD
  const onFinish = (values: { username: string; password: string }) => {
    console.log("Login success:", values)
    // 🔑 TODO: gọi API login, lưu token vào localStorage / context
    localStorage.setItem("isAuth", "true")
    navigate("/dashboard")
  }

  return (
    <div
=======
  const onFinish = async (values: ValuesRegister) => {
    const data = {
      username: values.email,
      password: values.password,
      email: values.email,
      firstName: values.fullname,
      lastName: values.fullname,
      dob: "",
      city:""
    }
    const res = await registerService(data);

    if (res.code === 1000) {
      message.success("Đăng kí thành công")
      navigate("/login")
    }
  }

  return (
    <>
    <SubNavbar/>
     <div
>>>>>>> 01a2cac
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f5f5f5",
      }}
    >
      <Card style={{ width: 360 }}>
        <Typography.Title level={3} style={{ textAlign: "center" }}>
          Đăng kí
        </Typography.Title>

        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="username"
            label="Tài khoản"
            rules={[{ required: true, message: "Nhập tài khoản!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Nhập username" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: "Nhập mật khẩu!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Nhập password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%", marginBottom: 8 }}
            >
              Đăng kí
            </Button>
            <Button
              block
              type="link"
              onClick={() => navigate("/login")}
            >
              Đăng nhập
            </Button>
            <Button
              block
              type="link"
              onClick={() => navigate("/")}
            >
              Về trang chủ
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
