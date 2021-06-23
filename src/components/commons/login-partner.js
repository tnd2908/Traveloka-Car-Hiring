import { Form, Input, message, Modal, Select, Spin } from 'antd';
import {
    LoadingOutlined
} from '@ant-design/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { API_URL } from '../../util/util';

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 15 },
};
const tailLayout = {
    wrapperCol: { offset: 6, span: 16 },
};
const {Option} = Select
const antIcon = <LoadingOutlined style={{ fontSize: 24, color: 'white' }} />;
const LoginPartner = () => {
    const [login, setLogin] = useState(true)
    const [spin, setSpin] = useState(false)
    const [isSPin, setIsSpin] = useState(false)
    const [form] = Form.useForm()
    const onRegister = (value) =>{
        const {partnerUsername, partnerPass, partnerRole} = value
        const data = {partnerUsername, partnerPass, partnerRole}
        console.log(data)
        setIsSpin(true)
        try {
            axios.post('https://oka1kh.azurewebsites.net/api/partner', data)
                .then(res=>{
                    if(res.data.status === "SUCCES"){
                        Modal.success({
                            title: 'Success',
                            content: (
                                <div>
                                    <p>Đăng ky thành công</p>
                                </div>
                            ),
                            onOk(){window.location="/login-partner"}
                        })
                    }
                    else{
                        Modal.error({
                            title: 'Không thể đăng ký tài khoản vào lúc này'
                        })
                    }
                    setIsSpin(false)
                })
        } catch (error) {
            message.error("Register fail")
            console.log(error)
        }
    }
    const loginPartner = (value) =>{
        try {
            setSpin(true)
            axios.post('https://oka1kh.azurewebsites.net/api/partner/login', value)
            .then(res=>{
                console.log(res.data)
                setSpin(false)
                if(res.data.status === "SUCCES"){
                  Modal.success({
                      title: 'Success',
                      content: (
                          <div>
                              <p>Đăng nhập thành công</p>
                          </div>
                      ),
                      onOk(){
                          localStorage.setItem("partner-token", res.data.token)
                          window.location = "/partner"
                      }
                  })
                }
                else{
                    Modal.error({
                        title: 'FAIL',
                        content: (
                            <div>
                                <p>Sai email hoặc password</p>
                            </div>
                        ),
                    })
                }
            })
        } catch (error) {
            console.log(error)
            setSpin(false)
        }        
    }
    const role = [
        {
            label: 'Khách sạn',
            value: 'KS'
        },
        {
            label: 'Thuê xe',
            value: 'TX'
        },
        {
            label: 'Vé máy bay',
            value: 'VMB'
        },
        {
            label: 'Tour du lịch',
            value: 'TDL'
        },
    ]
    return (
        <div className="container-fluid login-partner" style={{ padding: '0', minHeight: '100vh' }}>
            <nav>
                <Link to="/"><img className="app-logo-nav" src={process.env.PUBLIC_URL + "logo.png"} alt="" /></Link>
            </nav>
            <div className="banner">

            </div>
            <div className="container login-partner-form">
                {login ? <Form
                    {...layout}
                    size="large"
                    name="basic"
                    onFinish={loginPartner}
                    initialValues={{ remember: true }}
                >
                    <div className="inside-form rounded shadow">
                        <div className="d-flex justify-content-center">
                            <img className="app-logo" src={process.env.PUBLIC_URL + "logo.png"} alt="" />
                        </div>
                        <div className="form-left">
                        <Form.Item
                            label="Email"
                            name="partnerUsername"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="partnerPass"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <p onClick={()=>setLogin(false)} id="cooperation-link">Đăng ký tài khoản</p>
                            <button type="submit" className="btn-login-partner rounded">
                                <Spin
                                    spinning={spin}
                                    indicator={antIcon}
                                    style={{ marginRight: '12px' }}
                                />
                                Đăng nhập
                            </button>
                        </Form.Item>
                        </div>
                        
                    </div>
                </Form> :
                    <Form
                        {...layout}
                        name="basic"
                        form={form}
                        size="middle"
                        onFinish={onRegister}
                        initialValues={{ remember: true }}
                    >
                        <div className="inside-form rounded shadow-sm ">
                            <div className="d-flex justify-content-center">
                                <img className="app-logo" src={process.env.PUBLIC_URL + "logo.png"} alt="" />
                            </div>
                            <div className="form-right">
                            <Form.Item
                                label="Tên đăng nhập"
                                name="partnerUsername"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input name="partnerUsername"/>
                            </Form.Item>
                            <Form.Item
                                label="Mật khẩu"
                                name="partnerPass"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item
                              name="confirm"
                              label="Nhập lại mật khẩu"
                              dependencies={['partnerPass']}
                              hasFeedback
                              rules={[
                                    {
                                          required: true,
                                          message: 'Vui lòng nhập lại mật khẩu',
                                    },
                                    ({ getFieldValue }) => ({
                                          validator(_, value) {
                                                if (!value || getFieldValue('partnerPass') === value) {
                                                      return Promise.resolve();
                                                }

                                                return Promise.reject(new Error('Mật khẩu không trùng khớp'));
                                          },
                                    }),
                              ]}
                        >
                              <Input.Password />
                        </Form.Item>
                            <Form.Item
                                label="Vai trò"
                                name="partnerRole"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Select name="partnerRole">
                                    {role.map(item=>(
                                        <Option key={item.value} value={item.value}>{item.label}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item {...tailLayout}>
                                <p onClick={()=>setLogin(true)} id="cooperation-link">Đăng nhập ngay</p>
                                <button type="submit" className="btn-login-partner rounded">
                                    <Spin
                                        spinning={isSPin}
                                        indicator={antIcon}
                                        style={{ marginRight: '12px' }}
                                    />
                                    Đăng ký
                                </button>
                            </Form.Item>
                            </div>
                            
                        </div>
                    </Form>
                }
            </div>
        </div>
    )
}
export default LoginPartner