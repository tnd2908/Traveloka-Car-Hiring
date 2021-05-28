import { Form, DatePicker, Select } from 'antd';
import { useState } from 'react';

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
    const [val, setVal] = useState('')
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
        window.location = `/vehicles?country=VN&&dateStart=${dateStart}&&dateEnd=${dateEnd}`
    }
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
                            <div className="col-6">
                                <label htmlFor="place" className="mt-2">Khu vực thuê xe của bạn</label>
                                <Form.Item
                                    name="city"
                                    rules={[{ required: true, message: 'Vui lòng chọn khu vực' }]}
                                >
                                    <Select
                                        style={{ width: '100%' }}
                                        onChange={e=>setVal(e)}
                                        placeholder="Chọn thành phố">
                                        <Option value='VN'>Viet NAm</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            {val&&<div className="col-6">
                                <label htmlFor="place" className="mt-2">Quận</label>
                                <Form.Item
                                    name="district"
                                    rules={[{ required: false, message: 'Vui lòng chọn quận' }]}
                                >
                                    <Select
                                        style={{ width: '100%' }}
                                        placeholder="Chọn quận trong thành phố">
                                        <Option value='VN'>8</Option>
                                    </Select>
                                </Form.Item>
                            </div>}
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