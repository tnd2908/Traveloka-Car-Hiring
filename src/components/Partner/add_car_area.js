import React, { useEffect, useState } from 'react'
import { Form, Input, InputNumber, Select, Modal } from 'antd';
import axios from 'axios'
import { API_URL } from '../../util/util';
import '../../css/carErea.css'
import { useDispatch, useSelector } from 'react-redux';
import { setPartnerInfor } from '../../action/partner';
import { setList } from '../../action/car';

const { Option } = Select
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
const AddCarToDistrict = () => {
    const [form] = Form.useForm();
    const [country, setCountry] = useState('')
    const [countryList, setCountryList] = useState([])
    const [city, setCity] = useState('')
    const [cityList, setCityList] = useState([])
    const [district, setDistrict] = useState('')
    const [districtList, setDistrictList] = useState([])
    const listCar = useSelector(state => state.car.listCar)
    const dispatch = useDispatch()
    const header = {
        'Authorization': 'Bearer ' + localStorage.getItem("partner-token")
    }
    const getListCar = () => {
        try {
            axios.get(API_URL + "user/token", {
                headers: header
            })
                .then(res => {
                    const action = setPartnerInfor(res.data.result)
                    dispatch(action)
                    axios.get(API_URL + "car/saler?id=" + res.data.result.id)
                        .then(response => {
                            const action = setList(response.data.result, response.data.result)
                            dispatch(action)
                        })
                })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        try {
            axios.get(API_URL + "country")
                .then(res => setCountryList(res.data.result))
            axios.get(API_URL + "city")
                .then(res => setCityList(res.data.result))
            axios.get(API_URL + "district")
                .then(res => setDistrictList(res.data.result))
            getListCar()
        } catch (error) {
            console.log(error)
        }
    }, [])
    const handleAddCar = (value) => {
        try {
            const { idCar, idDistrict } = value
            const data = { idCar, idDistrict }
            axios.post(API_URL + "car/district", data)
                .then(response => {
                    if (response.data.status === 'SUCCESS') {
                        Modal.success({
                            content: response.data.result,
                            onOk: () => {
                                const obj = {
                                    idDistrict: '',
                                    idCar: '',
                                    idCountry: '',
                                    idCity: ''
                                }
                                form.setFieldsValue(obj)
                            }
                        })
                    }
                    else {
                        Modal.error({
                            content: response.data.result,
                        })
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className=" container component">
            <Form
                className="container"
                name="basic"
                style={{ backgroundColor: '#fff', boxShadow: '1px 5px 15px rgba(0, 0, 0, 0.2)', borderRadius: '7px', overflow: 'hidden', margin: '0 auto', maxWidth: '700px', padding: '10px 20px' }}
                initialValues={{ remember: false }}
                form={form}
                onFinish={handleAddCar}
            >
                <Form.Item className="former-header"><h5>Thêm xe vào khu vực</h5></Form.Item>
                <div className=" row">
                    <div className="area col-6">
                        <h6>Đất nước</h6>
                        <Form.Item
                            name="idCountry"
                            rules={[{ required: true, message: 'Vui lòng chọn khu vực' }]}
                        >
                            <Select
                                onChange={e => setCountry(e)}
                                placeholder="Chọn khu vực">
                                {countryList.map(country => (
                                    <Option key={country.name} value={country.id}> {country.name} </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <h6>Thành phố</h6>
                        <Form.Item
                            name="idCity"
                            rules={[{ required: true, message: 'Vui lòng chọn khu vực' }]}
                        >
                            <Select
                                style={{ width: '100%' }}
                                onChange={e => setCity(e)}
                                disabled={!country}
                                placeholder="Chọn thành phố">
                                {cityList.map(city => {
                                    if (country === city.idCountry) {
                                        return (<Option key={city.id} value={city.id}> {city.name} </Option>)
                                    }
                                })}
                            </Select>
                        </Form.Item>
                    </div>
                    <div className="car-deta col-6">
                        <h6>Quận</h6>
                        <Form.Item
                            name="idDistrict"
                            rules={[{ required: true, message: 'Vui lòng chọn thành phố' }]}
                        >
                            <Select
                                style={{ width: '100%' }}
                                disabled={!city}
                                onChange={e => setDistrict(e)}
                                value={district}
                                placeholder="Chọn quận trong thành phố">
                                {districtList.map(dis => {
                                    if (city === dis.idCity) {
                                        return (<Option key={dis.id} value={dis.id}> {dis.name} </Option>)
                                    }
                                })}
                            </Select>
                        </Form.Item>
                        <h6>Chọn xe</h6>
                        <Form.Item
                            name="idCar"
                            rules={[{ required: true, message: 'Vui lòng chọn xe muốn nhập' }]}
                        >
                            <Select
                                style={{ width: '100%' }}
                                placeholder="Chọn xe muốn nhập vào quận">
                                {listCar.map(car => {
                                    return (<Option key={car.id} value={car.id}> {car.name} </Option>)
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item></Form.Item>
                        <Form.Item></Form.Item>
                        <Form.Item   >
                            <button className="add-btn" type="submit">Thêm xe</button>
                        </Form.Item>
                    </div>
                </div>
            </Form>
        </div>
    );
}
export default AddCarToDistrict;