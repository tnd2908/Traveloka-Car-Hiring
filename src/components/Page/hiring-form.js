import { Form, DatePicker, Select } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { API_URL } from '../../util/util';

const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
};
const dateFormat = 'DD/MM/YYYY';

const HiringForm = () => {
    const { Option } = Select
    const [form] = Form.useForm()
    const [dateStart, setDateStart] = useState('')
    const [dateEnd, setDateEnd] = useState('')   
    const [district, setDistrict] = useState('')
    const [districtList, setDistrictList] = useState([])
    const [country, setCountry] = useState('')
    const [countryList, setCountryList] = useState([])
    const [city, setCity] = useState('')
    const [cityList, setCityList] = useState([])

    const onPlaceChange = (value) =>{
        console.log(value)
    }
    const onDateStartChange = (date, dateString) => {
        setDateStart(dateString)
    }
    const onDateEndChange = (date, dateString) => {
        setDateEnd(dateString)
    }
    const submitForm = (value) =>{
        console.log(value)
        if(district)
        window.location = `/vehicles?dateStart=${dateStart}&&dateEnd=${dateEnd}&&country=${country}&&city=${city}&&district=${district}`
        else
        window.location = `/vehicles?dateStart=${dateStart}&&dateEnd=${dateEnd}&&country=${country}&&city=${city}`
    }
    
    useEffect(()=>{
        try {
            axios.get(API_URL+"country")
                .then(res=>setCountryList(res.data.result))
            axios.get(API_URL+"district")
                .then(res=>setDistrictList(res.data.result))
            axios.get(API_URL+"city")
                .then(res=>setCityList(res.data.result))
        } catch (error) {
            console.log(error)
        }
    },[])
    return (
                <Form
                    {...layout}
                    className="find-car-form"
                    name="basic"
                    form={form}
                    initialValues={{ remember: true }}
                    onFinish={submitForm}
                    >
                    <div className="form-header">
                        <label htmlFor="select">Có tài xế hay xe tự lái?</label>
                            <Select
                                style={{ width: 180 }}
                                onChange={onPlaceChange}
                                placeholder="Tự lái">
                                     <Option value=''>Tự lái</Option>
                            </Select>
                        </div>
                    <div className="container-fluid bg-white">
                        <div className="row">
                        <div className="col-4">
                                <label htmlFor="place" className="mt-2">Khu vực thuê xe của bạn</label>
                                <Form.Item
                                    name="country"
                                    rules={[{ required: true, message: 'Vui lòng chọn khu vực' }]}
                                >
                                    <Select
                                        style={{ width: '100%' }}
                                        onChange={e=>setCountry(e)}
                                        placeholder="Chọn khu vực">
                                        {countryList.map(country=>(
                                            <Option key={country.name} value={country.id}> {country.name} </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className="col-4">
                                <label htmlFor="city" className="mt-2">Thành phố</label>
                                <Form.Item
                                    name="city"
                                    rules={[{ required: true, message: 'Vui lòng chọn khu vực' }]}
                                >
                                    <Select
                                        style={{ width: '100%' }}
                                        onChange={e=>setCity(e)}
                                        disabled={!country}
                                        placeholder="Chọn thành phố">
                                        {cityList.map(city=>{
                                            if(country === city.idCountry){
                                                return(<Option key={city.id} value={city.id}> {city.name} </Option>)
                                            }
                                        })}
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className="col-4">
                                <label htmlFor="district" className="mt-2">Quận</label>
                                <Form.Item
                                    name="district"
                                    rules={[{ required: false, message: 'Vui lòng chọn thành phố' }]}
                                >
                                    <Select
                                        style={{ width: '100%' }}
                                        disabled={!city}
                                        onChange={e=>setDistrict(e)}
                                        placeholder="Chọn quận trong thành phố">
                                        {districtList.map(dis=>{
                                            if(city === dis.idCity){
                                                return(<Option key={dis.id} value={dis.id}> {dis.name} </Option>)
                                            }
                                        })}
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid bg-white">
                        <div className="row">
                            <div className="col-4">
                                <Form.Item
                                    name="dateStart"
                                    label="Ngày bắt đầu"
                                    rules={[{ required: true, message: 'Vui lòng nhập ngày bắt đầu' }]}
                                    >
                                    <DatePicker onChange={onDateStartChange} id="startDate" dateFormat={dateFormat} />
                                </Form.Item>
                            </div>
                            
                            <div className="col-4">
                                <Form.Item
                                    name="dateEnd"
                                    label="Ngày kết thúc"
                                    rules={[{ required: true, message: 'Vui lòng nhập ngày kết thúc' }]}
                                >
                                    <DatePicker  onChange={onDateEndChange} id="startDate" dateFormat={dateFormat} />
                                </Form.Item>
                            </div>
                            
                            <div className="col-6 col-md-4 form-btn">
                                <Form.Item wrapperCol={{span: 24}}>
                                    <button type="submit" >Tim xe</button>
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                </Form>
    );
}
export default HiringForm