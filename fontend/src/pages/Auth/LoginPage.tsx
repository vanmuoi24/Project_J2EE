import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginUser } from "@/store/slices/authSlice";
import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Form, Input, Card, Typography, Alert } from "antd"
import {  Navigate, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const {loading, error, isAuth} = useAppSelector(state => state.auth)

  const onFinish = (values: { email: string; password: string }) => {
    dispatch(loginUser(values))
     .unwrap()
      .then((res) => {
        if (res.code === 1000) {
          navigate("/dashboard")
        }
      })
      .catch(() => {
        // lỗi đã được lưu trong redux error
      })
  }

  if (isAuth) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div
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
          Đăng nhập
        </Typography.Title>

         {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Nhập email!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Nhập email" />
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
              loading={loading}
            >
              Đăng nhập
            </Button>
             <Button
              block
              type="link"
              onClick={() => navigate("/register")}
            >
              Đăng kí
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
