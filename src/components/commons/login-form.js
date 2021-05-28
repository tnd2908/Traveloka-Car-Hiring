import {Form, Input, } from 'antd'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom'
import { LoginPartner } from '../../action/partner';

const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

const LogInForm = () =>{
      const [form] = Form.useForm()
      const onLogin = (value) =>{
            console.log(value)
      }
      return(
        <Form
              {...layout}
              name="basic"
              initialValues={{ remember: false }}
              style={{padding: '12px', paddingTop:'20px'}}
              className="login-form bg-white shadow-sm"
              form={form}
              onFinish={onLogin}
        >
              <h6 style={{fontWeight:'bold', marginBottom:'10px'}}>Đăng nhập tài khoản</h6>
              <Form.Item
                    name="email"
                    style={{fontWeight:'bold', color:'grey', marginBottom:'10px'}}
                    label="Email"
                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ email' }]}
              >
                    <Input name="email" size="large" />
              </Form.Item>
              <Form.Item
                    name="password"
                    style={{fontWeight:'bold', color:'grey'}}
                    rules={[{ required: true, message: 'Vui lòng nhập password' }]}
                    label="Password"
              >
                    <Input.Password size="large" />
              </Form.Item>
              <Form.Item>
                    <div className="d-flex">
                          <button type="submit" className="login-btn">Đăng nhập</button>
                          <div className="signup-link">
                                <p>Bạn chưa có tài khoản?</p>
                                <Link>Đăng ký ngay</Link>
                          </div>
                    </div>
              </Form.Item>
        </Form>
    )
}
export default LogInForm