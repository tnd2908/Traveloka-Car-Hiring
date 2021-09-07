import { Form, DatePicker, Select, message } from 'antd';
import locale from 'antd/lib/date-picker/locale/en_US';
import 'moment/locale/zh-cn';
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
    const [countryId, setCountryId] = useState('');
    const [cityId,setCityId] = useState('');
    const [districtId, setDistrictId] = useState('');
    const [countryCode, setCountryCode] = useState("");
    const [cityCode, setCityCode] = useState("");
    const [districtCode, setDistrictCode] = useState("");

    const onPlaceChange = (value) =>{
        console.log(value)
    }
    const onDateStartChange = (date, dateString) => {
        setDateStart(dateString)
    }
    const onDateEndChange = (date, dateString) => {
        console.log(dateString);
        setDateEnd(dateString)
    }

    const submitForm = async (value) => { 
        const startTime = {
            startYear: new Date(dateStart).getFullYear(),
            startMonth: new Date(dateStart).getMonth() + 1,
            startDate: new Date(dateStart).getDate()
        };
        const endTime = {
            endYear: new Date(dateEnd).getFullYear(),
            endMonth: new Date(dateEnd).getMonth() + 1,
            endDate: new Date(dateEnd).getDate()
        };
        const rentalInfo = { 
            startTime: startTime || "", 
            endTime: endTime || "",
            country: country || "",
            city: city || "",
            district: district || "",
        }
        if (
            startTime.startYear <= endTime.endYear && 
            startTime.startMonth <= endTime.endMonth && 
            startTime.startDate < endTime.endDate
            ) {
            if(district) {
                await localStorage.setItem("rentalInfo",JSON.stringify(rentalInfo))
                window.location = `/vehicles?dateStart=${dateStart}&&dateEnd=${dateEnd}&&country=${countryCode}&&city=${cityCode}&&district=${districtCode}`
            }
            else{
                await localStorage.setItem("rentalInfo",JSON.stringify(rentalInfo))
                window.location = `/vehicles?dateStart=${dateStart}&&dateEnd=${dateEnd}&&country=${countryCode}&&city=${cityCode}`
            }
        }        
        else {
            message.error("Ngày bắt đầu không được thấp hơn hoặc bằng ngày kết thúc")
        }
    }
    const onChangeCountry = (e) => {
        console.log(e);
        setCountry(e[0])
        setCountryId(e[1])
        setCountryCode(e[2])
    }

    const onChangeCity = (e) => {
        setCity(e[0]);
        setCityId(e[1]);
        setCityCode(e[2])
    }

    const onChangeDistrict = (e) => {
        setDistrict(e[0])
        setDistrictId(e[1])
        setDistrictCode(e[2])
    }

    useEffect(()=>{
        try {
            axios.get(API_URL+"country")
                .then(res=> setCountryList(res.data.result))
            axios.get(API_URL+"district")
                .then(res=> setDistrictList(res.data.result))
            axios.get(API_URL+"city")
                .then(res=> setCityList(res.data.result))
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
                                        onChange={e=> onChangeCountry(e)}
                                        placeholder="Chọn khu vực">
                                        {countryList.map(country=>(
                                            <Option key={country.id} value={[country.name,country.id,country.code]}>  
                                                {country.name} 
                                            </Option>
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
                                        onChange={e=> onChangeCity(e)}
                                        disabled={!countryId}
                                        placeholder="Chọn thành phố">
                                        {cityList.map(city=>{
                                            if(countryId === city.idCountry){
                                                return(<Option key={city.id} value={[city.name,city.id,city.code]}> {city.name} </Option>)
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
                                        disabled={!cityId}
                                        onChange={e=> onChangeDistrict(e)}
                                        placeholder="Chọn quận trong thành phố">
                                        {districtList.map(dis=>{
                                            if(cityId === dis.idCity){
                                                return(<Option key={dis.id} value={[dis.name,dis.id,dis.code]}> 
                                                    {dis.name} 
                                                </Option>)
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
                                    <DatePicker locale={locale} onChange={onDateStartChange} id="startDate" dateFormat={dateFormat} />
                                </Form.Item>
                            </div>
                            
                            <div className="col-4">
                                <Form.Item
                                    name="dateEnd"
                                    label="Ngày kết thúc"
                                    rules={[{ required: true, message: 'Vui lòng nhập ngày kết thúc' }]}
                                >
                                    <DatePicker locale={locale} onChange={onDateEndChange} id="startDate" dateFormat={dateFormat} />
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