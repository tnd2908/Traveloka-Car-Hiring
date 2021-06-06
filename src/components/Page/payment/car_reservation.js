import '../../../css/Reservation.css'
import { Form, Input } from 'antd';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
const Reservation = () => {
    const [form] = Form.useForm()
    let { idVehicle } = useParams();
    const [car, setCar] = useState({})
    const [value, setValue] = useState()

    useEffect(() => {
        fetchDetail();
    }, [])
    const fetchDetail = () => {
        try {
            axios.get(`https://mighty-meadow-74982.herokuapp.com/vehicle/detail/${idVehicle}`)
                .then(response => {
                    setCar(response.data.data)
                })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="container-fluid cover">
            <div className="container ">
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-7">
                        <div className="head">
                            <h3>Đặt chổ của tôi</h3>
                            <h6 style={{marginBottom:'0'}} className="text-muted">Điền thông tin và xem lại đặt chổ</h6>
                        </div>
                        <div className="login-with d-flex shadown-sm">
                            <img src="https://d1785e74lyxkqq.cloudfront.net/godwit/lib/_/_/node_modules/@traveloka/web-ui/shared/images/LoginBenefits-296b03a171e13f7eb131dd83e7ee6c21.png" alt=""/>
                            <div className="info pl-2">
                                <h6>Đăng nhập hoặc Đăng ký và tận hưởng ưu đãi dành riêng cho thành viên</h6>
                                <div className="d-flex">
                                    <button className="btn-a">Đăng nhập</button>
                                    <button className="btn-a">Đăng ký</button>
                                </div>
                            </div>
                        </div>
                        <div className="head">
                            <h5>Thông tin liên hệ</h5>
                        </div>
                        
                        <Form
                            form={form}
                            layout="vertical"
                        >
                            <div className="communicate shadow-sm">
                                <div className="d-flex justify-content-between">
                                    <h6>Thông tin liên hệ</h6>
                                    <p style={{ color: 'rgba(9, 157, 216)', fontSize: 'medium' }}>Điền thông tin</p>
                                </div>
                                <Form.Item 
                                    label="Họ tên" 
                                    name="name"
                                    rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]} 
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item 
                                    label="Địa điểm thuê xe" 
                                    name="place"
                                    rules={[{ required: true, message: 'Vui lòng nhập địa điểm' }]} 
                                >
                                    <Input />
                                </Form.Item>
                                <div className="d-flex justify-content-between mt-3">
                                    <Form.Item
                                        style={{width:'45%'}}
                                        label="Điện thoại đi dộng" required 
                                        name="phone"
                                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại ' }]}>
                                        <PhoneInput
                                            international
                                            defaultCountry="VN"
                                            value={value}
                                            onChange={setValue} />
                                        <span style={{ color: 'grey', }}>VD: +84 901234567 trong đó (+84) là mã quốc gia và 901234567 là số di động</span>
                                    </Form.Item>
                                    <Form.Item label="Email" 
                                        name="email"
                                        style={{width:'50%'}}
                                        rules={[{ required: true, message: 'Vui lòng nhập số email' }]}
                                    >
                                        <Input />
                                        <span style={{ color: 'grey' }}>VD: email@example.com</span>
                                    </Form.Item>
                                </div>
                            </div>
                            <Form.Item>
                                <div className="next-page-reserva d-flex justify-content-end">
                                <button type="submit">Tiếp tục</button>
                                    <Link to={`/vehicles/${car.idVehicle}/payment`}></Link>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                    <div style={{ marginTop: '25px' }} className="col-3">
                        <div className="head">
                            <h4>Chi tiết thuê xe</h4>
                        </div>
                        <div className="rental-info">
                            <p>Thuê xe tự lái</p>
                            <div>
                                <h6> {car.name} </h6>
                                <h6>Tự động</h6>
                            </div>
                        </div>
                        <div className="shadow-sm" style={{ backgroundColor: 'rgba(245,245,245)', padding: '10px' }}>
                            <h6>Thành phố/ khu vực thuê xe</h6>
                            <p>HCM</p>
                            <h6>Điểm đón xe</h6>
                            <p>15B Lê Thánh Tôn p1, Q1</p>
                            <span>Ngày - giờ kết thúc</span>
                            <p>8 tháng 5 2021 • 18:30</p>
                            <span>Điểm trả xe</span>
                            <p>15B Lê Thánh Tôn p1, Q1</p>
                        </div>
                        <div style={{ backgroundColor: 'white', padding: '10px 5px' }}>
                            <p>Được hoàn tiền</p>
                            <p>Không áp dụng đổi lịch bay</p>
                        </div>
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>
        </div>
    );
}

export default Reservation