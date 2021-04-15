import '../css/carRental.css'
import 'antd/dist/antd.css';
import {DatePicker, TimePicker} from 'antd'
import React, { Fragment, useState } from 'react';
import {Link} from 'react-router-dom'

function Imglink(){
    const array =[
        process.env.PUBLIC_URL + '/images/brand1.png',
        process.env.PUBLIC_URL + '/images/brand2.png',
        process.env.PUBLIC_URL + '/images/brand3.png',
        process.env.PUBLIC_URL + '/images/brand4.png',
        process.env.PUBLIC_URL + '/images/brand5.png',
        process.env.PUBLIC_URL + '/images/brand6.png',
        process.env.PUBLIC_URL + '/images/brand7.png',
        process.env.PUBLIC_URL + '/images/brand8.png',
        process.env.PUBLIC_URL + '/images/brand9.png',
        process.env.PUBLIC_URL + '/images/brand10.png',
        process.env.PUBLIC_URL + '/images/brand11.png',
        process.env.PUBLIC_URL + '/images/brand12.png',
        process.env.PUBLIC_URL + '/images/brand13.png',
        process.env.PUBLIC_URL + '/images/brand14.png',
        process.env.PUBLIC_URL + '/images/brand15.png',
        process.env.PUBLIC_URL + '/images/brand16.png',
        process.env.PUBLIC_URL + '/images/brand17.png',
        process.env.PUBLIC_URL + '/images/brand18.png',
        process.env.PUBLIC_URL + '/images/brand19.png',
        process.env.PUBLIC_URL + '/images/brand20.png',
        process.env.PUBLIC_URL + '/images/brand21.png',
        process.env.PUBLIC_URL + '/images/brand22.png',

    ]
    return(
        <Fragment>
            {array.map(item=>(
                <div className="img-box">
               <img src={item} alt="" key={1}/>
               </div>
            ))}
        </Fragment>
    );
}
const dateFormat = 'YYYY/MM/DD';

function CarHomePage(){
    const [city, setCity] = useState();    
    const onDateStartChange = (date, dateString)=>{
        localStorage.setItem('DateStart', dateString)
    }
    const onDateEndChange = (date, dateString)=>{
        localStorage.setItem('DateEnd', dateString)
    }
    const onPlaceChange = e =>{
        localStorage.setItem('City', e.target.value)
        setCity(e.target.value);
    }

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="banner">

                </div>
            </div>
            <div className="container main">
                <div className="form-container">
                    <form  className="find-car-form">
                        <div className="form-header">
                            <label htmlFor="select">Có tài xế hay xe tự lái?</label>
                            <select name="driver" id="select">
                                <option value="noDriver">Tự lái</option>
                                <option value="Diver">Có tài xế</option>
                            </select>
                        </div>
                        <div className="form-body">
                            <label htmlFor="place">Địa điểm thuê xe của bạn</label>
                            <div className="input-group">
                                <span><i class="fal fa-map-marker-alt"></i></span>
                                <input name="city" value = {city} onChange={onPlaceChange} type="text" placeholder="Điền thành phố, sân bay hoặc khách sạn"/>
                            </div>
                            <div className="container-fluid bg-white">
                                <div className="row">
                                    <div className="col-6 col-md-3">
                                        <label htmlFor="startDate">Ngày bắt đầu</label>
                                        <DatePicker onChange={onDateStartChange} id="startDate"  format={dateFormat}/>
                                    </div>
                                    <div className="col-6 col-md-2">
                                        <label htmlFor="timeStart">Giờ bắt đầu</label>
                                        <TimePicker/>
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <label htmlFor="startDate">Ngày kết thúc</label>
                                        <DatePicker onChange={onDateEndChange} id="startDate"  format={dateFormat}/>
                                    </div>
                                    <div className="col-6 col-md-2">
                                        <label htmlFor="timeStart">Giờ kết thúc</label>
                                        <TimePicker/>
                                    </div>
                                    <div className="col-6 col-md-2 form-btn">
                                        <Link to="/vehicles">Tim xe</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="introduction">
                            <h4>Các đối tác cho thuê xe</h4>
                            <h5>Các đối tác cho thuê xe yêu thích của bạn</h5>
                            <p>Chúng tôi hợp tác với các đối tác cho thuê xe uy tín trên toàn thế giới để đưa bạn đến bất kỳ nơi nào bạn muốn</p>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="brands">
                            <Imglink/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CarHomePage