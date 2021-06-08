import { useEffect, useState } from 'react';
import '../../css/admin.css'
import React from 'react'
import axios from 'axios'
import { Modal, message, Form, Input, InputNumber, Skeleton, Spin, Select, Tag } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { getListCarFromHighPrice, getListCarFromLowPrice, searchCar, setList } from '../../action/car';
import { LoadingOutlined } from '@ant-design/icons';
import { API_URL } from '../../util/util';
import { setPartnerInfor } from '../../action/partner';
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 15 },
};
const tailLayout = {
    wrapperCol: { offset: 6, span: 15 },
};
const { Search } = Input
const { Option } = Select
const ListCar = () => {
    const [form] = Form.useForm();
    const [detailVisible, setDetailVisible] = useState(false)
    const [data, setData] = useState({})
    const [isVisible, setIsvisible] = useState(false);
    const list = useSelector(state => state.car.listCar)
    const partner = useSelector(state => state.partner.partner)
    const [loading, setLoading] = useState(false)
    const [render, setRender] = useState(0)
    const dispatch = useDispatch()
    const showDetailCar = (data) => {
        setDetailVisible(true)
        setData(data)
    }
    const openEditVehicleForm = (data) => {
        setData(data)
        form.setFieldsValue(data)
        setIsvisible(true)
    }
    const handleEdit = (value) => {
        setLoading(true)
        try {
            axios.put(API_URL + "car/" + data.id, value)
                .then(response => {
                    setIsvisible(false)
                    console.log(response.data)
                    if (response.data.status === 'SUCCESS') {
                        message.success('Cập nhật thành công', 7)
                        setRender(render + 1)
                    }
                    else {
                        message.error('Vui lòng kiểm tra lại thông tin', 7)
                    }
                    setLoading(false)
                })
        } catch (error) {
            console.log(error)
        }
    }
    const token = localStorage.getItem("partner-token")
    useEffect(() => {
        try {
            const header = {'Authorization': token}
            axios.get("https://oka1kh.azurewebsites.net/api/profiles", {
                headers: header
            })
                .then(res => {
                    const action = setPartnerInfor(res.data.data.rolePartner[0])
                    dispatch(action)
                    axios.get(API_URL + "car/saler?id=" + res.data.data.rolePartner[0].partnerId)
                        .then(response => {
                            console.log(response.data)
                            const action = setList(response.data.result, response.data.result)
                            dispatch(action)
                        })
                })
        } catch (error) {
            console.log(error)
        }
    }, [render])

    const onSearch = (value) => {
        const action = searchCar(value)
        dispatch(action)
        setRender(render+1)
    }
    const sortUp = () => {
        const action = getListCarFromLowPrice(list)
        dispatch(action)
    }
    const sortDown = () => {
        const action = getListCarFromHighPrice(list)
        dispatch(action)
    }
    return (
        <div className="container component">
            <div className="row">
                <div className="admin-search col-md-6">
                    <h5>Tìm kiếm</h5>
                    <Search
                        size="large"
                        placeholder="Nhập tên xe cần tìm"
                        allowClear
                        // enterButton={<i class="far fa-search"></i>}
                        onSearch={onSearch}
                    />
                </div>
                <div className="admin-sort col-md-6 ">
                    <div id="h5">
                        <h5> Sắp xếp giá theo </h5>
                    </div>
                    <div className="btn-sort">
                        <button onClick={() => sortUp()} className="btn">Thấp - Cao <i class="fas fa-sort-amount-up"></i></button>
                        <button onClick={() => sortDown()} className="btn">Cao - Thấp <i class="fas fa-sort-amount-down"></i></button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    {isVisible && <Modal footer={null} title="Edit" visible={true} onCancel={() => setIsvisible(false)}>
                        <div className="car-infor shadow rounded-3" style={{ padding: '10px 20px', marginBottom: '15px', background: 'orange', color: 'white' }}>
                            <h5 className="text-light">Sửa thông tin xe</h5>
                        </div>
                        <Form
                            {...layout}
                            className="edit-form"
                            name="basic"
                            form={form}
                            style={{ backgroundColor: '#fff', boxShadow: '1px 5px 15px rgba(0, 0, 0, 0.2)', borderRadius: '7px', overflow: 'hidden' }}
                            initialValues={{ remember: true }}
                            onFinish={handleEdit}
                        >
                            <Form.Item
                                label="Tên xe"
                                name="name"
                                rules={[{ required: true, message: 'Vui lòng nhập tên xe' }]}
                                style={{ marginTop: '30px' }}
                            >
                                <Input placeholder="Nhập tên xe" />
                            </Form.Item>
                            <Form.Item
                                label="Giá"
                                name="self_drive_price"
                                rules={[{ required: true, message: 'Vui lòng nhập giá tiền' }]}
                            >
                                <InputNumber placeholder="Nhập giá tiền" style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item
                                label="Số lượng"
                                name="quantity"
                                rules={[{ required: true, message: 'Vui lòng nhập số lượng xe' }]}
                            >
                                <InputNumber placeholder="Nhập số lượng xe" style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item
                                label="Loại xe"
                                name="typeCar"
                                rules={[{ required: true, message: 'Vui lòng chọn loại xe' }]}
                                style={{ marginTop: '30px' }}
                            >
                                <Select>
                                    <Option key="Số sàn" value="Số sàn">Số sàn</Option>
                                    <Option key="Số tự động" value="Số tự động">Số tự động</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item  {...tailLayout}>
                                <button style={{ float: 'right', backgroundColor: 'orange', color: 'white', width: '100px' }} type="submit" className="btn"> {loading ? <Spin indicator={<LoadingOutlined style={{ color: 'white' }} />} /> : <span>Chỉnh sửa</span>}</button>
                            </Form.Item>
                        </Form>
                    </Modal>}
                    {detailVisible && <Modal width={1000} footer={null} title="Chi tiết xe" visible={detailVisible} onCancel={() => setDetailVisible(false)}>
                        <div className="container">
                            <div className="row">
                                <div className="col-6">
                                    <div className="card" style={{ borderStyle: 'none' }}>
                                        <img className="card-image rounded" src={API_URL + "images/" + data.avatar} alt="" />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div>
                                        <div className="d-flex flex-column">
                                            <h3>{data.name}</h3>
                                        </div>
                                        {data.typeCar === 'Số tự động' ? <Tag style={{padding:'2px 10px', fontWeight:'bold'}} color="#87d068">{data.typeCar}</Tag> : <Tag color="#2db7f5">{data.typeCar}</Tag>}
                                        <div className="pt-2 mt-2" style={{borderTop:'1px solid #eee'}}>
                                            <h5>Chi tiết:</h5>
                                            <ul className="form-detail">
                                                <li>Bảo hiểm: {data.insurance}</li>
                                                <li>Số chỗ: {data.Seat}</li>
                                                <li>Số lượng {data.quantity}</li>
                                                <li>Đã thuê: {data.HiredCount}</li>
                                                <li>Đang thuê: {data.HiringCount}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="mt-3">
                                    <h5 className="float-end">Giá: <span style={{fontSize:'25px', fontWeight:'bold'}} className="text-danger">{new Intl.NumberFormat().format(data.self_drive_price)} VND</span> / Ngày</h5>
                                </div>
                            </div>
                        </div>

                    </Modal>}
                    <table class="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Stt</th>
                                <th scope="col">Tên xe</th>
                                <th scope="col">Loại xe</th>
                                <th scope="col">Giá</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.length > 0 ? list.map((car, index) => {
                                return (
                                    <tr className="list-car-row">
                                        <th style={{ width: '60px' }} scope="row"> {index + 1} </th>
                                        <td> {car.name}</td>
                                        <td> {car.typeCar}</td>
                                        <td> {new Intl.NumberFormat().format(car.self_drive_price)} / Ngày</td>
                                        <td style={{ width: '100px' }}> {car.quantity}</td>
                                        <td style={{ width: '150px' }} >
                                            <div className="d-flex">
                                                <button onClick={() => showDetailCar(car)} className="btn-detail">Chi tiết</button>
                                                <button onClick={() => openEditVehicleForm(car)} className="btn-edit"><i class="fal fa-edit"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            }) :
                                <Skeleton width={700} style={{ backgroundColor: "black" }} active />}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default ListCar