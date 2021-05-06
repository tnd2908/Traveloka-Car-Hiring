import React, { useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import '../../css/carDetail.css'
const CarDetail = () =>{
    let {idVehicle} = useParams();
    useEffect(()=>{
        fetchDetail();
    },[])
    const fetchDetail = () =>{
        try {
            axios.get(`https://mighty-meadow-74982.herokuapp.com/vehicle/`)
            .then(response=>{
                console.log(response)
            })
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <div>
            <div className="car-detail">
                <div className="car">
                        <img  src={process.env.PUBLIC_URL + '/images/vehicle.jpg'}/>
                        <div className="info">
                        <p>Tên xe: rolls Royce Phantom Wheelbase </p>
                        <p>Cung cấp bởi Smart Rent Car Driverless Jakarta</p>
                                <div className="iconic">
                                    <p> <img  src={process.env.PUBLIC_URL + '/images/pilot.png'}/>Tự lái</p>
                                    <p> <img  src={process.env.PUBLIC_URL + '/images/wheel.png'}/>Số sàn</p>
                                    <p> <img  src={process.env.PUBLIC_URL + '/images/minicar.png'}/>Năm 2015 trở lên</p>
                                </div>
                        </div>
                </div> 
                        <div className="Policy">
                            <h4>Thông tin thuê xe</h4>
                            <h5>Tiện ích</h5>
                            <p> <img  src={process.env.PUBLIC_URL + '/images/shield.png'}/>Vehicle insurance</p>
                            <p> <img  src={process.env.PUBLIC_URL + '/images/24.png'}/>24/7 Traveloka Customer Service</p>
                            <h5>Chính sách</h5>
                            <p> <img  src={process.env.PUBLIC_URL + '/images/check.png'}/>Rental Requirements</p>
                            <ul>
                                <li>ID card (KTP or passport)</li>
                                <li>Driver’s License (SIM A)/International Driving Permit</li>
                                <li>Others (if provider requires additional verification)</li>
                            </ul>
                            <p> <img  src={process.env.PUBLIC_URL + '/images/fuel.png'}/>Return the fuel as received</p>
                            <p> <img  src={process.env.PUBLIC_URL + '/images/clock.png'}/>Usage of up to 24 hours per rental day</p>
                            <p> <img  src={process.env.PUBLIC_URL + '/images/cash.png'}/>Áp dụng hoàn tiền</p>
                            <h5>Chính sách</h5>
                            <p>Rental Requirements</p>
                            <h5>Before Pick-up</h5>
                            <ol>
                                <li>The driver must share with the provider a photo of their identity card (KTP or Passport).</li>
                                <li>The driver must share with the provider a photo of their driver’s license (SIM A) or International Driving Permit.</li>
                                <li>The driver must pay a deposit via cash, transfer, or credit card to the provider before the rental begins.The amount will be informed by the provider after booking is finished.</li>
                                <li>All documents presented must be original, complete, valid, and match the name used in the booking.</li>
                            </ol>
                            <h5>Dịch vụ thuê xe</h5>
                            <ol>
                                <li>Hãy chắc chắn đọc các yêu cầu về thuê xe và tài xế của nhà cung cấp, sau đó đặt xe và thanh toán tiền thuê xe. </li>
                                <li>Sau khi thanh toán của bạn được xác nhận, hãy điền đầy đủ thông tin được yêu cầu từ nhà cung cấp xe.</li>
                                <li>Sau khi nhà cung cấp xác minh các yêu cầu, hãy kiểm tra tình trạng xe với nhân viên của nhà cung cấp.</li>
                                <li>Đọc và ký thỏa thuận thuê xe của nhà cung cấp, sau đó bạn có thể sử dụng dịch vụ.</li>
                            </ol>
                            <div className="chose-loca">

                            </div>
                        </div>    
            </div>
        </div>                 
    );
}
export default CarDetail