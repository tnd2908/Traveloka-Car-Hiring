import React, { useState } from 'react'
import '../../css/Reservation.css'
import { Form, Input, Button, Radio } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
const Reservation =()=>{

        const [form] = Form.useForm()

    return(
        <div className="container">
            <div className="row">
                <div className="col-1"></div>
                    <div style={{paddingBottom:'200px'}} className="col-7">
                        <div className="head">
                            <h3>Đặt chổ của tôi</h3>
                            <p>Điền thông tin và xem lại đặt chổ</p>
                        </div>
                        <div className="login-with d-flex">
                            <p><i style={{ color: 'rgba(9, 157, 216)' , fontSize:'xxx-large' }} class="fas fa-user-circle" aria-hidden="true"></i></p>
                                <div className="info">
                                    <h6>Đăng nhập với tên Nguyễn Quốc Thịnh</h6>
                                    <p>bằng google</p>
                                </div>
                        </div>
                        <div className="head">
                            <h3>Thông tin liên hệ</h3>
                        </div>
                        <div className="communicate">
                            <div style={{alignContent:'space-between',justifyContent:'space-between'}} className="d-flex">
                                <h6>Thông tin liên hệ</h6>
                                <p style={{color:'rgba(9, 157, 216)', fontSize:'medium'}}>Điền thông tin</p>
                            </div>
                            <Form
                                layout="vertical"

                            >
                                <Form.Item label="Họ tên" required >
                                    <Input  />
                                    <span style={{color:'grey'}}>như trên cmnd(không dấu)</span>
                                </Form.Item>
                            </Form>
                            <Form
                                style={{alignContent:'space-between', justifyContent:'space-evenly'}}
                                className="d-flex"
                                form={form}
                                layout="vertical"
                                >
                                <Form.Item label="Điện thoại đi dộng" required >
                                    <Input  />
                                    <span style={{color:'grey',}}>VD: +84 901234567 trong đó (+84) là mã quốc gia và 901234567 là số di động</span>
                                </Form.Item>
                                <Form.Item label="Email" required>
                                    <Input />
                                    <span style={{color:'grey'}}>VD: email@example.com</span>
                                </Form.Item>
                                </Form>
                        </div>
                        <div className="head">
                            <h3>Thông tin chi tiết về tài xế</h3>
                        </div>
                        <div className="communicate">
                            <div style={{alignContent:'space-between',justifyContent:'space-between'}} className="d-flex">
                                <h6>Tài xế</h6>
                                <p style={{color:'rgba(9, 157, 216)', fontSize:'medium'}}>Điền thông tin</p>
                            </div>
                            <Form
                                style={{padding:'10px 0'}}
                                layout="vertical"
                            >
                                <Form.Item label="Danh xưng" required >
                                    <Input  />
                                </Form.Item>
                                <Form.Item label="Họ tên" required >
                                    <Input  />
                                </Form.Item>
                                <Form.Item label="Điện thoại đi động" required >
                                    <Input  />
                                </Form.Item>
                            </Form>  
                        </div>
                        <div className="next-page-reserva">
                            <button>Tiếp tục</button>
                        </div>
                    </div>
                    <div style={{marginTop:'25px'}} className="col-3">
                        <div className="head">
                            <h3>Chi tiết thuê xe</h3>
                        </div>
                        <div className="rental-info">
                        <p>Thuê xe tự lái</p>
                        <div>
                        <h6>Rolls Royce Phantom Wheelbase</h6>
                        <h6>Tự động</h6>
                        </div>
                        </div>
                        <div style={{backgroundColor:'rgba(245,245,245)',padding:'10px 5px' }}>
                            <h6>Thành phố/ khu vực thuê xe</h6>
                            <p>HCM</p>
                            <h6>Điểm đón xe</h6>
                            <p>15B Lê Thánh Tôn p1, Q1</p>
                            <span>Ngày - giờ kết thúc</span>
                            <p>8 tháng 5 2021 • 18:30</p>
                            <span>Điểm trả xe</span>
                            <p>15B Lê Thánh Tôn p1, Q1</p>
                        </div>
                        <div style={{backgroundColor:'white',padding:'10px 5px'}}>
                        <p>Được hoàn tiền</p>
                        <p>Không áp dụng đổi lịch bay</p>
                        </div>
                        </div>
                <div className="col-1"></div>
            </div>
        </div>
    );
}

export default Reservation