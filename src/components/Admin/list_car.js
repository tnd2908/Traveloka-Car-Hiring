import { useEffect, useState } from 'react';
import '../../css/admin.css'
import React from 'react'
import axios from 'axios'
import { Modal, message, Form, Input, InputNumber, Skeleton } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { searchCar, setList } from '../../action/car';
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 15 },
};
const tailLayout = {
    wrapperCol: { offset: 6, span: 15 },
};
const {Search} = Input
const ListCar = () => {
    const [form] = Form.useForm();
    const [brand, setBrand] = useState([])
    const [idVehicle, setIdVehicle] = useState('')
    const [isVisible, setIsvisible] = useState(false);
    const list = useSelector(state=>state.car.listCar)
    const dispatch = useDispatch()
    const handleClose = () => {
        setIsvisible(false);
    };

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
    useEffect(() => {
        try {
            axios.get("https://mighty-meadow-74982.herokuapp.com/vehicle/")
                .then(response => {
                    const action = setList(response.data.data, response.data.data)
                    dispatch(action)
                })
            axios.get("https://mighty-meadow-74982.herokuapp.com/manufactor")
                .then(response => {
                    setBrand(response.data.data)
                })
        } catch (error) {
            console.log(error)
        }
    }, [])
    const onSearch = (value) =>{
        console.log(value)
        const action = searchCar(value)
        dispatch(action)
    }
    return (
        <div className="container-fluid component">
            <div className="row">
                <div className="admin-search">
                    <h5>Tìm kiếm</h5>
                    <Search 
                        size="large" 
                        placeholder="Nhập tên xe cần tìm" 
                        style={{ width: '50%' }} 
                        allowClear
                        enterButton={<i class="far fa-search"></i>}
                        onSearch = {onSearch}
                    />
                </div>
            </div>
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
                            <Modal footer={null} title="Sửa thông tin xe" visible={isVisible}  onCancel={handleClose}>
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
                            {list.length > 0 ? list.map((car, index) => {
                                return (
                                    <tr className="list-car-row">
                                        <th scope="row"> {index} </th>
                                        <td> {car.name}</td>
                                        {brand.map(br => {
                                            if (car.idManufactor === br.idManufactor) {
                                                return (<td>{br.name}</td>);
                                            }
                                        })}
                                        <td> {car.price} / Ngày</td>
                                        <td> {car.quantity}</td>
                                        <td>
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