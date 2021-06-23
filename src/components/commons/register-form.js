import {Form, Input, Modal, Spin} from 'antd'
import axios from 'axios';
import {Link} from 'react-router-dom'
import { API_URL, PROFILE_API_URL } from '../../util/util';
import {
      LoadingOutlined
  } from '@ant-design/icons';
import {useState} from 'react'
const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };
  const antIcon = <LoadingOutlined style={{ fontSize: 24, color: 'white' }} />;
const Register = () =>{
      const [form] = Form.useForm()
      const [spin, setSpin] = useState(false)

      const onRegister = (value) => {
            try {
                    setSpin(true)
                    axios.post("https://oka1kh.azurewebsites.net/api/adduserall", {...value, cards: "123456"}, {
                        headers: {
                            "Access-Control-Allow-Origin": "*"
                        }
                    })
                    .then(res=> {
                          console.log(res.data)
                          setSpin(false)
                          if(res.data.status === "SUCCES"){
                            Modal.success({
                                title: 'Success',
                                content: (
                                    <div>
                                        <p>Đăng ký thành công</p>
                                    </div>
                                ),
                                onOk(){
                                    localStorage.setItem("user-token", res.data.data.token)
                                    window.location = "/"
                                }
                            })
                          }
                          else{
                              Modal.error({
                                  title: 'FAIL',
                                  content: (
                                      <div>
                                          <p>Đã có lỗi xảy ra</p>
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
      return(
        <Form
              {...layout}
              name="basic"
              initialValues={{ remember: false }}
              style={{padding: '12px', paddingTop:'20px'}}
              className="login-form bg-white shadow-sm"
              form={form}
              onFinish={onRegister}
        >
              <h6 style={{fontWeight:'bold', marginBottom:'10px'}}>Đăng ký tài khoản</h6>
              <Form.Item
                    name="fristName"
                    style={{fontWeight:'bold', color:'grey', marginBottom:'10px'}}
                    label="Họ"
                    rules={[{ required: true, message: 'Vui lòng nhập họ' }]}
              >
                    <Input name="fristName" size="large" />
              </Form.Item>
              <Form.Item
                    name="lastName"
                    style={{fontWeight:'bold', color:'grey', marginBottom:'10px'}}
                    label="Tên"
                    rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
              >
                    <Input name="lastName" size="large" />
              </Form.Item>
              <Form.Item
                    name="userAddress"
                    style={{fontWeight:'bold', color:'grey', marginBottom:'10px'}}
                    label="Địa chỉ"
                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
              >
                    <Input name="userAddress" size="large" />
              </Form.Item>
              <Form.Item
                    name="phone"
                    style={{fontWeight:'bold', color:'grey', marginBottom:'10px'}}
                    label="Số điện thoại"
                    rules={[{ required: true, message: 'Vui lòng nhập sdt' }]}
              >
                    <Input name="phone" size="large" />
              </Form.Item>
              <Form.Item
                    name="email"
                    style={{fontWeight:'bold', color:'grey', marginBottom:'10px'}}
                    label="Email"
                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ email' }]}
              >
                    <Input name="email" size="large" />
              </Form.Item>
              <Form.Item
                    name="pass"
                    style={{fontWeight:'bold', color:'grey'}}
                    rules={[{ required: true, message: 'Vui lòng nhập password' }]}
                    label="Password"
              >
                    <Input.Password size="large" />
              </Form.Item>
              <Form.Item>
                    <div className="d-flex">
                        <button type="submit" className="login-btn">
                              <Spin
                              spinning={spin}
                              indicator={antIcon}
                              style={{ marginRight: '12px' }}
                                /> 
                              {!spin&& <span>Đăng nhập</span>}
                        </button>
                    </div>
              </Form.Item>
        </Form>
    )
}
export default Register