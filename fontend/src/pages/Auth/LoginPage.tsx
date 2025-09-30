  import { useAppDispatch, useAppSelector } from "@/store/hooks";
  import { loginUser } from "@/store/slices/authSlice";
  import { LockOutlined, UserOutlined } from "@ant-design/icons"
  import { Button, Form, Input, Card, Typography, message, Divider, Space } from "antd"
  import {  Navigate, useNavigate } from "react-router-dom";
  import logo from '@/assets/images/logo.png'
  import TopNavbar from "@/components/Share/TopNavbar";
import { GoogleLogin } from "@react-oauth/google";

  export default function LoginPage() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const {loading, error, isAuth} = useAppSelector(state => state.auth)

    const onFinish = (values: { email: string; password: string }) => {
      dispatch(loginUser(values))
      .unwrap()
        .then((res) => {
          if (res.code === 1000) {
            message.success("Đăng nhập thành công!", 3);
            navigate("/admin")
          }
        })
        .catch(() => {
          // lỗi đã được lưu trong redux error
        })
    }

    if (isAuth) {
      return <Navigate to="/admin" replace />
    }

    return (
      <>
      <TopNavbar/>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: 'column',
            minHeight: "100vh",
            background: "#f5f5f5",
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{
              width: 400,
              height: 80,
              objectFit: "contain",
              margin: "30px 16px",
              display: "block",
            }}
          />
          <Card style={{ width: 450,  boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
            <Typography.Title level={3} style={{ textAlign: "center" }}>
              Đăng nhập
            </Typography.Title>

            {/* {error && (
              <Alert
                message={error}
                type="error"
                showIcon
                style={{ marginBottom: 16 }}
              />
            )} */}

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


                  <Divider plain>hoặc</Divider>

                  <Space direction="vertical" style={{ width: "100%" }}>
                    <GoogleLogin
                       onSuccess={(credentialResponse) => {
                          console.log("Google Login Success:", credentialResponse);
                          // credentialResponse.credential = JWT token
                          // gửi về backend để xác thực
                        }}
                        onError={() => {
                          console.log("Login Failed");
                        }}
                    />
                    {/* <FacebookLogin
                      appId="YOUR_FACEBOOK_APP_ID"
                      autoLoad={false}
                      fields="name,email,picture"
                      callback={handleFacebookResponse}
                      textButton="Đăng nhập với Facebook"
                      icon={<FacebookOutlined />}
                      cssClass="ant-btn ant-btn-default ant-btn-block"
                    /> */}
                  </Space>

                  <Typography.Paragraph style={{ textAlign: "center", marginBottom: 0 }}>
                    Chưa có thành viên?{" "}
                    <Button type="link" onClick={() => navigate('/register')    } style={{ padding: 0 }}>
                      Đăng kí ngay
                    </Button>
                  </Typography.Paragraph>
                <Button
                  type="link"
                  onClick={() => navigate("/")}
                  style={{display: 'block', margin: '0 auto'}}
                >
                  Về trang chủ
                </Button>
              </Form.Item>
            </Form>

            
          </Card>
        </div>
      </>
    )
  }
