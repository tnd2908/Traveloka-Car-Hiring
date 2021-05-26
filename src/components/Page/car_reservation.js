import React, { useState,useEffect,Component } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import '../../css/Reservation.css'
import { Form, Input, Button, Radio } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

const Reservation =()=>{
        let { id } = useParams();
        const [car,setCar] = useState({})
        const [form] = Form.useForm()
    
        useEffect(() => {
            fetchDetail();
        }, [])
        const fetchDetail = () => {
            try {
                axios.get(`https://mighty-meadow-74982.herokuapp.com/vehicle/detail/${id}`)
                    .then(response => {
                        setCar(response.data.data)
                    })
            } catch (error) {
                console.log(error)
            }
        }
    return(
        <div className="container-fluid">
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
                            <div className="communicate container">
                                <div style={{alignContent:'space-between',justifyContent:'space-between'}} className="d-flex">
                                    <h6>Thông tin liên hệ</h6>
                                    <p style={{color:'rgba(9, 157, 216)', fontSize:'medium'}}>Điền thông tin</p>
                                </div>
                                <Form
                                    className="row"
                                    layout="vertical"
                                    form={form}
                                    
                                >
                                    <Form.Item label="Họ tên" required className="col-lg-12">
                                        <Input  />
                                        <span style={{color:'grey'}}>như trên cmnd(không dấu)</span>
                                    </Form.Item> 
                                    <div className="d-flex" style={{alignContent:'space-between', justifyContent:'space-evenly'}}>
                                    <Form.Item label="Điện thoại đi dộng" required className="col-lg-4" style={{alignItems:'flex-start'}}>
                                        <Input  />
                                        <span style={{color:'grey',}}>VD: +84 901234567 trong đó (+84) là mã quốc gia và 901234567 là số di động</span>
                                    </Form.Item>
                                    <Form.Item label="Email" required className="col-lg-6" style={{alignItems:'flex-end'}}>
                                        <Input />
                                        <span style={{color:'grey'}}>VD: email@example.com</span>
                                    </Form.Item>
                                    </div>
                                    </Form>
                            </div>
                            <div className="head">
                                <h3>Thông tin chi tiết về tài xế</h3>
                            </div>
                            <div className="communicate container">
                                <div style={{alignContent:'space-between',justifyContent:'space-between'}} className="d-flex">
                                    <h6>Tài xế</h6>
                                    <p style={{color:'rgba(9, 157, 216)', fontSize:'medium'}}>Điền thông tin</p>
                                </div>
                                <Form
                                    className="row"
                                    style={{padding:'10px 0'}}
                                    layout="vertical"
                                    form={form}
                                >
                                    <Form.Item label="Danh xưng" required className="col-lg-3">
                                        <Input  />
                                    </Form.Item>
                                    <Form.Item label="Họ tên" required >
                                        <Input  />
                                    </Form.Item>
                                    {/* <Example/> */}
                                    <Form.Item label="Điện thoại đi động" required className="col-lg-4">
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
                            <p><img alt=".." src={process.env.PUBLIC_URL + 'https://d1785e74lyxkqq.cloudfront.net/godwit/lib/_/_/node_modules/@traveloka/icon-kit-web/svg/blue/ic_product_car_rental-fill_24px-a38547b600c89a8dd630e1405bfadb3c.svg'}/>Thuê xe tự lái</p>
                            <div>
                            <h6>{car.name}</h6>
                            <h6>Tự động</h6>
                            </div>
                            </div>
                            <div style={{backgroundColor:'rgb(192, 192, 192)',padding:'10px 5px' }}>
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
                            <p><img alt=".." src={process.env.PUBLIC_URL + 'https://d1785e74lyxkqq.cloudfront.net/godwit/lib/_/_/node_modules/@traveloka/icon-kit-web/svg/greenPrimary/ic_system_status_ok_done-fill_24px-d019f4a8d7d6848be63c068a364f6890.svg'}/>Được hoàn tiền</p>
                            <p><img alt=".." src={process.env.PUBLIC_URL + 'https://d1785e74lyxkqq.cloudfront.net/godwit/lib/_/_/node_modules/@traveloka/icon-kit-web/svg/dark/ic_system_status_info_24px-dd2cc4a8443a6828fcae1f346a501ed3.svg'}/>Không áp dụng đổi lịch bay</p>
                            </div>
                            </div>
                    <div className="col-1"></div>
                </div>
            </div>
        </div>
    );
}

export default Reservation