import React, { useEffect } from 'react'
import axios from 'axios'
// import { useParams } from 'react-router-dom'
import '../../css/carDetail.css'
const CarDetail = () => {
    // let { idVehicle } = useParams();
    useEffect(() => {
        fetchDetail();
    }, [])
    const fetchDetail = () => {
        try {
            axios.get(`https://mighty-meadow-74982.herokuapp.com/vehicle/`)
                .then(response => {
                    console.log(response)
                })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="container">
        <div className="row">
            <div className="col-9">
                <div className="car-detail">
                    <div className="car">
                            <img alt=".."  src={process.env.PUBLIC_URL + '/images/vehicle.jpg'}/>
                            <div className="info">
                            <p>Tên xe: Rolls Royce Phantom Wheelbase </p>
                            <p>Cung cấp bởi Smart Rent Car Driverless Jakarta</p>
                                    <div className="iconic">
                                         <img alt=".." src={process.env.PUBLIC_URL + '/images/pilot.png'}/><p>Tự lái</p>
                                         <img alt=".." src={process.env.PUBLIC_URL + '/images/wheel.png'}/><p>Số sàn</p>
                                         <img alt=".." src={process.env.PUBLIC_URL + '/images/minicar.png'}/><p>Năm 2015 trở lên</p>
                                    </div>
                            </div>
                    </div> 
                        <div className="Policy">
                            <h4>Thông tin thuê xe</h4>
                            <h5>Tiện ích</h5>
                            <p> <img alt=".." src={process.env.PUBLIC_URL + '/images/shield.png'}/>Vehicle insurance</p>
                            <p> <img alt=".." src={process.env.PUBLIC_URL + '/images/24.png'}/>24/7 Traveloka Customer Service</p>
                            <h5>Chính sách</h5>
                            <p> <img alt=".." src={process.env.PUBLIC_URL + '/images/check.png'}/>Rental Requirements</p>
                            <ul>
                                <li>ID card (KTP or passport)</li>
                                <li>Driver’s License (SIM A)/International Driving Permit</li>
                                <li>Others (if provider requires additional verification)</li>
                            </ul>
                            <p> <img alt=".." src={process.env.PUBLIC_URL + '/images/fuel.png'}/>Return the fuel as received</p>
                            <p> <img alt=".." src={process.env.PUBLIC_URL + '/images/clock.png'}/>Usage of up to 24 hours per rental day</p>
                            <p> <img alt=".." src={process.env.PUBLIC_URL + '/images/cash.png'}/>Áp dụng hoàn tiền</p>
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
                        </div> 
                    <div className="choose-loca">
                            <h5>Chọn địa điểm đón xe</h5>
                            <p>Văn phòng thuê xe</p>
                        <form>
                            <div class="form-row">
                                <div class="col">
                                <input type="text" class="form-control" placeholder="Điền tên địa điểm hoặc địa chỉ"/>
                                </div>
                            </div>
                        </form>
                            <p>Địa điểm khác</p>
                            <form>
                                <div class="form-row">
                                    <div class="col">
                                    <input type="text" class="form-control" placeholder="Điền tên địa điểm hoặc địa chỉ"/>
                                    </div>
                                </div>
                            </form>
                    </div>
                    </div>
                    <h4 style={{marginTop:'20px'}}>Chi tiết giá</h4>
                    <div className="pursuit">
                        <p>Bạn thanh toán</p>
                        <h6>560.000 VND</h6>
                    </div>
                    <div className="next-page">
                        <button>Tiếp tục</button>
                    </div>
                 </div>     
            <div className="col-3"> 
            <div className="rental-info">
                <h5>Tóm tắt xe thuê</h5>
                <div  className="d-flex mb-2">
                    <img alt=".." src={process.env.PUBLIC_URL + '/images/vehicle.jpg'}/>
                    <div>
                        <p style={{margin:'0'}}>Rolls Royce Phantom Wheelbase</p>
                        <p className="badge bg-warning">Số sàn</p>
                    </div>
                </div>
                <div className="content">
                    <ul>
                        <li>Jakarta</li>
                        <li>T6, 07 Th05 2021 10:30 - T7, 08 Th05 2021 10:30</li>
                    </ul>
                </div>
            </div>
            <div className="payment">
                <h5>Tổng giá tiền</h5>
                <h6>560.000 VND</h6>
                <button>Tiếp tục</button>
                <p>Đã bao gồm thuế, phí</p>
                <p>Giá thuê cơ bản 560.000 VND</p>
                <p>Bạn thanh toán 560.000VND</p>
            </div>
            </div>
        </div>
    </div>                
    );
}
export default CarDetail