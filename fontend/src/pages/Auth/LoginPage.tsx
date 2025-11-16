import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginUser } from '@/store/slices/authSlice';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Card, Typography, message, Divider, Space, Alert } from 'antd';
import { Navigate, useNavigate } from 'react-router-dom';
import logo from '@/assets/images/logo.png';
import SubNavbar from '@/components/Share/SubNavbar';
import { GoogleLogin } from '@react-oauth/google';
import { sessionService } from '@/services/sessionServices';
import type { RootState } from '@/store';

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, isAuth } = useAppSelector((state: RootState) => state.auth);

  const onFinish = async (values: { email: string; password: string }) => {
    const res = await dispatch(loginUser(values)).unwrap();
    if (res.code === 1000) {
      sessionService.setSession(res.result.token, res.result.user);
      message.success('Đăng nhập thành công!', 3);
      navigate('/admin');
    }
  };

  if (isAuth) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <>
      <div className="flex justify-center items-center flex-col min-h-[100vh] bg-[#f5f5f5]">
        {/* <img
          src={logo}
          alt="Logo"
          className="w-[400px] h-[80px] object-contain !my-[30px] !mx-[16px] block"
        /> */}
        <Card className="w-[450px] shadow-2xl">
          <Typography.Title level={3} className="text-center !text-[#7BBCB0]">
            Đăng nhập
          </Typography.Title>

          {error && <Alert message={error} type="error" showIcon className="!mb-[16px]" />}

          <Form
            name="login_form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: 'Nhập email!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Nhập email" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[{ required: true, message: 'Nhập mật khẩu!' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Nhập password" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full !mb-[8px] !bg-[#7BBCB0]"
                loading={loading}
              >
                Đăng nhập
              </Button>

              <Divider plain>hoặc</Divider>

              <Space direction="vertical" className="w-full">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    console.log('Google Login Success:', credentialResponse);
                    // credentialResponse.credential = JWT token
                    // gửi về backend để xác thực
                  }}
                  onError={() => {
                    console.log('Login Failed');
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

              <Typography.Paragraph className="text-center !mb-0">
                Chưa có tài khoản?{' '}
                <Button
                  type="link"
                  onClick={() => navigate('/register')}
                  className="!p-0 !text-[#7BBCB0]"
                >
                  Đăng kí ngay
                </Button>
              </Typography.Paragraph>
              <Button
                type="link"
                onClick={() => navigate('/')}
                className="w-full text-center !my-0 !mx-auto !text-[#7BBCB0]"
              >
                Về trang chủ
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
}
