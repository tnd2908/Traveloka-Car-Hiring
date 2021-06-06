import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import '../../css/carDetail.css'

const CarDetail = () => {
    let { id } = useParams();
    const [car, setCar] = useState({})

    useEffect(() => {
        fetchDetail();
    }, [])
    const fetchDetail = () => {
        try {
            axios.get(`https://mighty-meadow-74982.herokuapp.com/vehicle/detail/${id}`)
                .then(response => {
                    setCar(response.data.data)
                    window.scrollTo(0,0)
                })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="cover">
            <div className="container">
                <div className="row">
                    <div className="col-9">
                        <div className="car-detail container">
                            <div className="car row d-flex">
                                <img className="col-xs-12 col-lg-6" alt=".." src={car.image} />
                                <div className="info col-xs-12 col-lg-6">
                                    <h4>Tên xe: {car.name} </h4>
                                    <p>Cung cấp bởi Smart Rent Car Driverless Jakarta</p>
                                    <div className="iconic">
                                        <img alt=".." src={process.env.PUBLIC_URL + 'https://ik.imagekit.io/tvlk/image/imageResource/2019/07/04/1562235110991-221f181276cd7208e907c33bb8554fe5.png?tr=h-24,q-75,w-24'} /><p>Tự lái</p>
                                        <img alt=".." src={process.env.PUBLIC_URL + 'https://ik.imagekit.io/tvlk/image/imageResource/2019/10/18/1571396866495-94f335c88b623b7484537b663c79c3c8.png?tr=h-24,q-75,w-24'} /><p>Số sàn</p>
                                        <img alt=".." src={process.env.PUBLIC_URL + 'https://ik.imagekit.io/tvlk/image/imageResource/2019/10/18/1571396866495-94f335c88b623b7484537b663c79c3c8.png?tr=h-24,q-75,w-24'} /><p>Năm 2015 trở lên</p>
                                    </div>
                                </div>
                            </div>
                            <div className="Policy">
                                <h4>Thông tin thuê xe</h4>
                                <h5>Chính sách</h5>
                                <p> <img alt=".." src={process.env.PUBLIC_URL + 'https://ik.imagekit.io/tvlk/image/imageResource/2019/10/18/1571395285230-4686f763f756af30e2cead479c2136d1.png?tr=q-75,w-24'} />Return the fuel as received</p>
                                <p> <img alt=".." src={process.env.PUBLIC_URL + 'https://ik.imagekit.io/tvlk/image/imageResource/2019/10/18/1571395232903-53349baf788ab844ae442df68a822cb6.png?tr=q-75,w-24'} />Usage of up to 24 hours per rental day</p>
                                <p> <img alt=".." src={process.env.PUBLIC_URL + 'https://ik.imagekit.io/tvlk/image/imageResource/2019/10/18/1571395182181-eb3cdc412f8fe20b9207cbcfdf80890a.png?tr=q-75,w-24'} />Rental Requirements</p>
                                <ul>
                                    <li>ID card (KTP or passport)</li>
                                    <li>Driver’s License (SIM A)/International Driving Permit</li>
                                    <li>Others (if provider requires additional verification)</li>
                                </ul>
                                <p> <img alt=".." src={process.env.PUBLIC_URL + 'https://ik.imagekit.io/tvlk/image/imageResource/2020/10/28/1603886283014-038ad4e0552654b0fe681f9d4b741bd6.png?tr=q-75,w-24'} />Áp dụng hoàn tiền</p>
                                <h5>Tiện ích</h5>
                                <p> <img alt=".." src={process.env.PUBLIC_URL + 'https://ik.imagekit.io/tvlk/image/imageResource/2019/10/18/1571395393133-fd2bcbd3bce1985c3bae6ea231f6969e.png?tr=q-75,w-24'} />Vehicle insurance</p>
                                <p> <img alt=".." src={process.env.PUBLIC_URL + 'https://ik.imagekit.io/tvlk/image/imageResource/2019/10/18/1571395341121-5ec5b1f9b4589e860127dbbdfa4527b5.png?tr=q-75,w-24'} />24/7 Traveloka Customer Service</p>
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
                        </div>
                        <h4 style={{ marginTop: '20px' }}>Chi tiết giá</h4>
                        <div className="pursuit">
                            <p>Bạn thanh toán</p>
                            <h6>{new Intl.NumberFormat().format(car.price)} VND</h6>
                        </div>
                        <div className="next-page">
                            <Link to={`/vehicles/${id}/payment`}><button>Tiếp tục</button></Link>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="rental-info">
                            <h5>Tóm tắt xe thuê</h5>
                            <div className="d-flex mb-2">
                                <img alt=".." src={car.image} />
                                <div className="abc">
                                    <h6 style={{ margin: '0' }}>{car.name}</h6>
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
                            <h6>{new Intl.NumberFormat().format(car.price)}</h6>
                            <Link to={`/vehicles/${id}/payment`}><button>Tiếp tục</button></Link>
                            <p>Đã bao gồm thuế, phí</p>
                            <p>Giá thuê cơ bản {new Intl.NumberFormat().format(car.price)} VND</p>
                            <p>Bạn thanh toán {new Intl.NumberFormat().format(car.price)} VND</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CarDetail