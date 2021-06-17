import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import '../../css/carDetail.css'
import { API_URL } from "../../util/util";
import { Button, Form, Input, Tag } from 'antd'
import {getNewBill} from "../../action/bill";
import { useDispatch, useSelector } from 'react-redux'
import {GoogleMap} from "react-google-maps";
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox"
import GoogleSearchBox from "./GoogleSearchBox";
import SearchResult from './SearchPopup'
import { setUserInfor } from '../../action/user'

const CarDetail = () => {
    let { id } = useParams();
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16,},
    }
    const [car, setCar] = useState({})
    const [rental,setRental] = useState({});
    const rentalInfo = JSON.parse(localStorage.getItem("rentalInfo"));
    const [newInfo, setNewInfo] = useState({});
    const [location, setLocation] = useState([]);
    const [result, setResult] = useState([]);
    const userInfo = useSelector(state => state.user.user);
    const [fields, setFields] = useState([
        {
          name: ['fullname'],
          value: userInfo?.fristName + " " + userInfo?.lastName,
        },
        {
            name: ['phone'],
            value: userInfo?.phone,
        },
        {
            name: ['email'],
            value: userInfo?.email,
        },
        {
            name: ['address'],
            value: userInfo?.userAddress,
        }
    ]);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    useEffect(() => {
        getRental();
        fetchDetail();
        window.scrollTo(0,0)
    }, [])

    useEffect(() => {
        const API_KEY='MBc5WX8KIlUI3hz4mvtJK4AHl_qNyHTN9goucUA4HFU'
        if (rental) {
            if (rental.district) {
                console.log(1111);
                axios.get(`https://geocode.search.hereapi.com/v1/geocode?q=${rental.district}&apiKey=MBc5WX8KIlUI3hz4mvtJK4AHl_qNyHTN9goucUA4HFU`)
                .then(res => setLocation(res.data.items[0].position))
            }
            else if(rental.city) {
                axios.get(`https://geocode.search.hereapi.com/v1/geocode?q=${rental.city}&apiKey=MBc5WX8KIlUI3hz4mvtJK4AHl_qNyHTN9goucUA4HFU`)
                .then(res => setLocation(res.data.items[0].position))
            }
        }
    },[rental])

    useEffect(()=>{
        try {
            const header = {'Authorization': localStorage.getItem("user-token")}
              axios.get( 'https://oka1kh.azurewebsites.net/api/profiles', {
                    headers: header
                })
              .then(res=>{
                form.setFieldsValue({
                    ...res.data.data.auth[0], 
                    fullname: `${res.data.data.auth[0].fristName} ${res.data.data.auth[0].lastName}`,
                    address: res.data.data.auth[0].userAddress
                })
                const action = setUserInfor(res.data.data.auth[0])
                dispatch(action)
              })
          } catch (error) {
            console.log(error)
          }
    },[])
    const getRental = () => {
        setRental(rentalInfo);
    }

    const fetchDetail = () => {
        try {
            axios.get(API_URL + "car/detail/" + id)
                .then(response => {
                    setCar(response.data.result)
                    window.scrollTo(0,0)
                })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        setNewInfo(userInfo);
    }, [JSON.stringify(userInfo)])

    const insertBill = () => {
        dispatch(setUserInfor(newInfo))
        const carInsert = {
            ...newInfo,
            idUser: userInfo.userId,
            listCar: car.id,
            idSaler: car.idSaler,
            startDate: Object.values(rental.startTime).toString(),
            endDate: Object.values(rental.endTime).toString(),
            total: car.self_drive_price,
        }
        axios.post(API_URL + "bill", carInsert)
        .then(res => dispatch(getNewBill(res.data.result)));
    }
    const onChange = (info) => {
        console.log(info);
        form.setFieldsValue({[info.target.name]:info.target.value})
        setNewInfo({...newInfo,[info.target.name]:info.target.value});
    }
    console.log(newInfo)
    const onChangeLocation = (e) => {
        setNewInfo({...newInfo, address: e, userAddress: e})
        const iat = Object.values(location).toString();
        const MAP_URL = `https://places.ls.hereapi.com/places/v1/discover/explore?at=${iat}&Accept-Language=vi-VN%2Cvi%3Bq%3D0.9%2Cfr-FR%3Bq%3D0.8%2Cfr%3Bq%3D0.7%2Cen-US%3Bq%3D0.6%2Cen%3Bq%3D0.5&app_id=Rq2W3egvN4ZOHf3n4Ba0&app_code=pIsWVmUXrtPIicRNz1hj3g`
        axios.get(MAP_URL).then(res => {
            const arr = []
            res.data.results.items.map(item => {
                if(item && item.title.toLowerCase().includes(e)) {
                    arr.push({
                        title: item.title,
                        address: item.vicinity.replace("<br/>", " ,")
                    })
                }
            })
            setResult(arr);
        })
    }

    return (
        <div className="cover">
            <div className="container">
                <div className="row">
                    <div className="col-8">
                        <div className="car-detail container">
                            <div className="car row d-flex">
                                <img className="col-xs-12 col-lg-6" alt=".." src={API_URL + "images/" +car.avatar || ""} />
                                <div className="info col-xs-12 col-lg-6">
                                    <h4>Tên xe: {car.name} </h4>
                                    <p>Cung cấp bởi Smart Rent Car Driverless Jakarta</p>
                                    <div className="iconic">
                                        <img alt=".." src={process.env.PUBLIC_URL + 'https://ik.imagekit.io/tvlk/image/imageResource/2019/07/04/1562235110991-221f181276cd7208e907c33bb8554fe5.png?tr=h-24,q-75,w-24'} /><p>Tự lái</p>
                                        <img alt=".." src={process.env.PUBLIC_URL + 'https://ik.imagekit.io/tvlk/image/imageResource/2019/10/18/1571396866495-94f335c88b623b7484537b663c79c3c8.png?tr=h-24,q-75,w-24'} /><p> {car.typeCar} </p>
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
                    </div>
                    <div className="col-4 bg-white">
                    <div className="rental-info">
                        <h5>Tóm tắt xe thuê</h5>
                        <div className="mb-2 d-flex">
                            <img alt=".." src={API_URL + "images/" + car.avatar} />
                            <div className="abc">
                                <h6 style={{ margin: '0' }}>{car.name}</h6>
                                <p className="badge bg-warning"> {car.typeCar} </p>
                            </div>
                        </div>
                        <div className="content">
                                <ul style={{paddingLeft:"0"}}>
                                    <li>
                                        {
                                            rental?.country && <Tag color="gold">{rental?.country}</Tag>
                                        }
                                        {
                                            rental?.city && <Tag color="gold">{rental?.city}</Tag>
                                        }
                                        {
                                            rental?.district && <Tag color="gold">{rental?.district}</Tag>
                                        }
                                    </li>
                                    <li className="mt-2">
                                        {
                                            rental?.startTime && 
                                                <Tag color="blue">{rental.startTime.startYear} - {rental.startTime.startMonth} - {rental.startTime.startDate}</Tag>
                                        } - {
                                            rental?.endTime && 
                                                <Tag color="blue">{rental.endTime.endYear} - {rental.endTime.endMonth} - {rental.endTime.endDate}</Tag>
                                        }
                                        
                                    </li>
                                </ul>
                            </div>
                        <Form form={form} {...layout}>
                            <div className="user-info mt-3">
                                <h5>Thông tin liên hệ</h5>
                                    <Form.Item  name="fullname" label="Họ và tên">
                                        <Input name="fullname" onChange={onChange} value={`${userInfo?.fristName || ""}  ${userInfo?.lastName || ""} ` || ""}/>
                                    </Form.Item>

                                    <Form.Item name="phone" label="Số điện thoại">
                                        <Input name="phone" onChange={onChange} value={userInfo?.phoneNum || ""}/>
                                    </Form.Item>
                                    <Form.Item name="email" onChange={onChange} label="Email">
                                        <Input name="email" value={userInfo?.email || ""}/>
                                    </Form.Item>
                                
                                    <Form.Item name="userAddress" label="Địa chỉ nhận xe">
                                        <SearchResult name="userAddress" value={userInfo.userAddress || ""} result={result} onChange={onChangeLocation}/>
                                    </Form.Item>
                                    <Form.Item name="vouncher" label="Mã khuyến mãi">
                                        <Input.Password  name="vouncher"/>
                                        <button className="btn btn-success col mt-4">Áp dụng</button>
                                    </Form.Item>
                            </div>
                            <div className="payment">
                                <h5>Tổng giá tiền</h5>
                                    <Form.Item>
                                        <h4 className="text-danger" name="price">{new Intl.NumberFormat().format(car.self_drive_price)} VND</h4>
                                    </Form.Item>
                                <Link to={`/vehicles/${id}/payment`}><button onClick={insertBill}>Tiếp tục</button></Link>
                                <p>Đã bao gồm thuế, phí</p>
                                <p>Giá thuê cơ bản {new Intl.NumberFormat().format(car.self_drive_price)} VND</p>
                                <p>Bạn thanh toán {new Intl.NumberFormat().format(car.self_drive_price)} VND</p>
                            </div> 
                        </Form>
                    </div>
                </div>
           
            <h4 style={{ marginTop: '20px' }}>Chi tiết giá</h4>
            <div className="pursuit">
                <p>Bạn thanh toán</p>
                <h6>{new Intl.NumberFormat().format(car.self_drive_price)} VND</h6>
            </div>
            <div className="next-page">
                <Link to={`/vehicles/${id}/payment`}><button>Tiếp tục</button></Link>
            </div>
        </div>
    </div>
</div>
    );
}
export default CarDetail