import { Form, Input, Modal, Spin } from 'antd';
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
const antIcon = <LoadingOutlined style={{ fontSize: 24, color: 'white' }} />;
const LoginPartner = () => {
    const [login, setLogin] = useState(true)
    const [spin, setSpin] = useState(false)
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
                        size="middle"
                        initialValues={{ remember: true }}
                    >
                        <div className="inside-form rounded shadow-sm ">
                            <div className="d-flex justify-content-center">
                                <img className="app-logo" src={process.env.PUBLIC_URL + "logo.png"} alt="" />
                            </div>
                            <div className="form-right">
                            <Form.Item
                                label="Họ tên"
                                name="fullname"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Số điện thoại"
                                name="phoneNum"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Tên công ty"
                                name="company"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item {...tailLayout}>
                                <p onClick={()=>setLogin(true)} id="cooperation-link">Đăng nhập ngay</p>
                                <button className="btn-login-partner rounded">
                                    <Spin
                                        spinning={true}
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