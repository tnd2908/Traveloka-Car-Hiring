import { Form, TimePicker, DatePicker, Option, Select } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSchedule } from '../../action/schedule';

const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
};
const dateFormat = 'DD/MM/YYYY';

const HiringForm = () => {
    const { Option } = Select
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const [sche,setSche] = useState({
        dateStart: '',
        dateEnd: ''
    })
    const schedule = useSelector(state=>state.schedule.schedule)
    const onPlaceChange = (value) =>{
        console.log(value)
    }
    const onDateStartChange = (date, dateString) => {
        setSche({...sche, dateStart: dateString})
    }
    const onDateEndChange = (date, dateString) => {
        setSche({...sche, dateEnd: dateString})
    }
    const submitForm = () =>{
        const action = setSchedule(sche)
        dispatch(action)
    }
    return (
                <Form
                    {...layout}
                    className="find-car-form"
                    name="basic"
                    form={form}
                    initialValues={{ remember: true }}
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
                            <div className="col-12">
                                <label htmlFor="place" className="mt-2">Địa điểm thuê xe của bạn</label>
                                <Form.Item
                                    name="city"
                                    rules={[{ required: true, message: 'Vui lòng nhập thành phố' }]}
                                >
                                    <Select
                                        style={{ width: 360 }}
                                        placeholder="Điền thành phố, sân bay hoặc khách sạn">
                                        <Option value='Viet Nam'>Viet NAm</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid bg-white">
                        <div className="row">
                            <div className="col-4">
                                <Form.Item
                                    name="username"
                                    rules={[{ required: false, message: 'Vui lòng nhập ngày bắt đầu' }]}
                                    >
                                    <label htmlFor="startDate">Ngày bắt đầu</label>
                                    <DatePicker onChange={onDateStartChange} id="startDate" dateFormat={dateFormat} />
                                </Form.Item>
                            </div>
                            
                            <div className="col-4">
                                <Form.Item
                                    name="password"
                                    rules={[{ required: false, message: 'Vui lòng nhập ngày kết thúc' }]}
                                >
                                    <label htmlFor="startDate">Ngày kết thúc</label>
                                    <DatePicker  onChange={onDateEndChange} id="startDate" dateFormat={dateFormat} />
                                </Form.Item>
                            </div>
                            
                            <div className="col-6 col-md-2 form-btn">
                                <Form.Item>
                                    <button onClick={()=>submitForm()} type="button" className="btn">Tim xe</button>
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                </Form>
    );
}
export default HiringForm