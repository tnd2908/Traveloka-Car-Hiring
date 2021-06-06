import {Form, Input, Modal, Spin} from 'antd'
import axios from 'axios';
import {Link} from 'react-router-dom'
import { API_URL } from '../../util/util';
import {
      LoadingOutlined
  } from '@ant-design/icons';
import {useState} from 'react'
const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };
  const antIcon = <LoadingOutlined style={{ fontSize: 24, color: 'white' }} />;
const LogInForm = () =>{
      const [form] = Form.useForm()
      const [spin, setSpin] = useState(false)

      const onLogin = (value) =>{
            try {
                  setSpin(true)
                  axios.post(API_URL + 'user/login', value)
                      .then(res=>{
                          console.log(res.data)
                          setSpin(false)
                          if(res.data.status === "SUCCESS"){
                              const header = {'Authorization': 'Bearer ' + res.data.token}
                              axios.get(API_URL + 'user/token', {
                                  headers: header
                              })
                              .then(response=>{
                                  console.log(response.data)
                                  Modal.success({
                                      title: 'Success',
                                      content: (
                                          <div>
                                              <p>Đăng nhập thành công</p>
                                          </div>
                                      ),
                                      onOk(){
                                          if(response.data.result.role === 'saler'){
                                              localStorage.setItem("partner-token", res.data.token);
                                              window.location = "/partner"
                                          }
                                          else if (response.data.result.role === 'customer'){
                                              localStorage.setItem("user-token", res.data.token)
                                              window.location = "/"
                                          }
                                      }
                                  })
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
                    name="gmail"
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
                        <button type="submit" className="login-btn">
                              <Spin
                              spinning={spin}
                              indicator={antIcon}
                              style={{ marginRight: '12px' }}
                                /> 
                              {!spin&& <span>Đăng nhập</span>}
                        </button>
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