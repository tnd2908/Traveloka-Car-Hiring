import { Form, TimePicker, DatePicker, Option, Select } from 'antd';

const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
};
const HiringForm = () => {
    const { Option } = Select
    return (
                <Form
                    {...layout}
                    className="find-car-form"
                    name="basic"
                    initialValues={{ remember: true }}
                    >
                    <div className="form-header">
                        <label htmlFor="select">Có tài xế hay xe tự lái?</label>
                            <Select
                                style={{ width: 180 }}
                                placeholder="Tự lái">
                                     <Option value=''>Viet NAm</Option>
                            </Select>
                        </div>
                    <div className="container-fluid bg-white">
                        <div className="row">
                            <div className="col-12">
                                <label htmlFor="place" className="mt-2">Địa điểm thuê xe của bạn</label>
                                <Select
                                    style={{ width: 360 }}
                                    placeholder="Điền thành phố, sân bay hoặc khách sạn">

                                </Select>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid bg-white">
                        <div className="row">
                            <div className="col-6 col-md-3">
                                <Form.Item
                                    name="username"
                                    rules={[{ required: true, message: 'Vui lòng nhập ngày bắt đầu' }]}
                                    >
                                    <label htmlFor="startDate">Ngày bắt đầu</label>
                                    <DatePicker id="startDate"  />
                                </Form.Item>
                            </div>
                            <div className="col-6 col-md-2">
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Vui lòng nhập thời gian khởi hành' }]}
                                >
                                <label htmlFor="timeStart">Giờ bắt đầu</label>
                                <TimePicker />
                            </Form.Item>
                            </div>
                            <div className="col-6 col-md-3">
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Vui lòng nhập ngày kết thúc' }]}
                                >
                                    <label htmlFor="startDate">Ngày kết thúc</label>
                                    <DatePicker id="startDate"  />
                                </Form.Item>
                            </div>
                            <div className="col-6 col-md-2">
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Vui lòng nhập giờ kết thúc' }]}
                                >
                                    <label htmlFor="timeStart">Giờ kết thúc</label>
                                    <TimePicker />
                                </Form.Item>
                            </div>
                            <div className="col-6 col-md-2 form-btn">
                                <Form.Item>
                                    <button className="btn">Tim xe</button>
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                </Form>
    );
}
export default HiringForm