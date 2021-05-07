import { useEffect, useState } from 'react';
import '../../css/admin.css'
import React from 'react'
import axios from 'axios'
import { Modal, message, Form, Input, InputNumber, Skeleton, Upload } from 'antd'
import { useSelector } from 'react-redux';
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 15 },
};
const tailLayout = {
    wrapperCol: { offset: 6, span: 15 },
};
const ListCar = () => {
    const [form] = Form.useForm();
    const [listCar, setListCar] = useState([])
    const [brand, setBrand] = useState([])
    const [idVehicle, setIdVehicle] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isVisible, setIsvisible] = useState(false);
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleClose = () => {
        setIsvisible(false);
    };
    const confirmDelete = (id) => {
        setIsModalVisible(true);
        setIdVehicle(id)
    }
    const openEditVehicleForm = (id) => {
        setIdVehicle(id)
        setIsvisible(true)
    }
    const handleEdit = (value)=>{
        console.log(value)
        try {
            axios.put(`https://mighty-meadow-74982.herokuapp.com/${idVehicle}, ${value}`)
            .then(response=>{
                console.log(response)
                setIsvisible(false)
                message.success('Cập nhật thành công')
            })
        } catch (error) {
            console.log(error)
        }
    }
    const handleDelete = (id) => {
        try {
            axios.delete(`https://mighty-meadow-74982.herokuapp.com/vehicle/${id}`)
                .then(response => {
                    console.log(response)
                    message.success('Đã xoá thành công!')
                })
        } catch (error) {
            console.log(error)
        }
        handleCancel()
    }
    useEffect(() => {
        try {
            axios.get("https://mighty-meadow-74982.herokuapp.com/vehicle/")
                .then(response => {
                    setListCar(response.data.data)
                })
            axios.get("https://mighty-meadow-74982.herokuapp.com/manufactor")
                .then(response => {
                    setBrand(response.data.data)
                })
        } catch (error) {
            console.log(error)
        }
    }, [JSON.stringify(listCar)])
    return (
        <div className="container-fluid component">
            <div className="row">
                <div className="col-12">
                    <table class="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Stt</th>
                                <th scope="col">Tên xe</th>
                                <th scope="col">Hãng xe</th>
                                <th scope="col">Giá</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Modal footer={null} title="Bạn có chắc muốn xoá?" visible={isModalVisible} onOk={handleCancel} onCancel={handleCancel}>
                                <p> {idVehicle} </p>
                                <div className="modal-btn">
                                    <button className="btn-delete" onClick={() => handleDelete(idVehicle)}>ĐỒNG Ý</button>
                                </div>
                            </Modal>
                            <Modal footer={null} title="Sửa thông tin xe" visible={isVisible} onOk={handleClose} onCancel={handleClose}>
                                <div className="car-infor shadow rounded-3" style={{padding:'10px 20px', marginBottom:'15px', background:'orange', color:'white'}}>
                                    <h5 className="text-light">Thông tin hiện tại:</h5>
                                </div>
                                <Form
                                    {...layout}
                                    className="edit-form"
                                    name="basic"
                                    form={form}
                                    style={{ backgroundColor: '#fff', boxShadow: '1px 5px 15px rgba(0, 0, 0, 0.2)', borderRadius: '7px', overflow: 'hidden' }}
                                    initialValues={{ remember: true}}
                                    onFinish={handleEdit}
                                >
                                    <Form.Item
                                        label="Tên xe"
                                        name="name"
                                        rules={[{ required: true, message: 'Vui lòng nhập tên xe' }]}
                                        style={{marginTop:'30px'}}
                                    >
                                        <Input  placeholder="Nhập tên xe" />
                                    </Form.Item>

                                    <Form.Item
                                        label="Giá"
                                        name="price"
                                        rules={[{ required: true, message: 'Vui lòng nhập giá tiền' }]}
                                    >
                                        <InputNumber placeholder="Nhập giá tiền" style={{ width: '100%' }} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Số lượng"
                                        name="quantity"
                                        rules={[{ required: true, message: 'Vui lòng nhập số lượng xe' }]}
                                    >
                                        <InputNumber placeholder="Nhập số lượng xe"  style={{ width: '100%' }}  />
                                    </Form.Item>
                                    <Form.Item  {...tailLayout}>
                                        <button style={{ float:'right', backgroundColor:'orange', color:'white'}} type="submit" className="btn">Chỉnh sửa</button>
                                    </Form.Item>
                                </Form>
                            </Modal>
                            {listCar.length > 0 ? listCar.map((car, index) => {
                                return (
                                    <tr>
                                        <th scope="row"> {index} </th>
                                        <td> {car.name}</td>
                                        {brand.map(br => {
                                            if (car.idManufactor === br.idManufactor) {
                                                return (<td>{br.name}</td>);
                                            }
                                        })}
                                        <td> ${car.price} / Ngày</td>
                                        <td> {car.quantity}</td>
                                        <td>
                                            <button onClick={() => { confirmDelete(car.idVehicle) }} className="btn-delete"><i class="fal fa-trash-alt"></i></button>
                                            <button onClick={() => { openEditVehicleForm(car.idVehicle) }} className="btn-edit"><i class="fal fa-edit"></i></button>
                                        </td>
                                    </tr>
                                );
                            }):
                            <Skeleton width={700} style={{backgroundColor:"black"}} active/>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default ListCar