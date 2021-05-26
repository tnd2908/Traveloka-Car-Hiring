import { useEffect, useState } from 'react';
import '../../css/admin.css'
import React from 'react'
import axios from 'axios'
import { Modal, message, Form, Input, InputNumber, Skeleton, Spin } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { getListCarFromHighPrice, getListCarFromLowPrice, searchCar, setList } from '../../action/car';
import { LoadingOutlined } from '@ant-design/icons';
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
    const [editData, setEditData] = useState({})
    const [isVisible, setIsvisible] = useState(false);
    const list = useSelector(state=>state.car.listCar)
    const [loading, setLoading] = useState(false)
    const [render,setRender] = useState(0)
    const dispatch = useDispatch()
    const handleClose = () => {
        setIsvisible(false);
    };
    const openEditVehicleForm = (data) => {
        setEditData(data)
        form.setFieldsValue(data)
        setIsvisible(true)
    }
    const handleEdit = (value)=>{
        setLoading(true)
        try {
            axios.put(`https://mighty-meadow-74982.herokuapp.com/vehicle/${editData.idVehicle}`, value)
            .then(response=>{
                setIsvisible(false)
                message.success('Cập nhật thành công')
                setRender(render+1)
                setLoading(false)
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
    }, [render])
    const onSearch = (value) =>{
        const action = searchCar(value)
        dispatch(action)
    }
    const sortUp = ()=>{
        const action = getListCarFromLowPrice(list)
        dispatch(action)
    }
    const sortDown = ()=>{
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
                        onSearch = {onSearch}
                    />
                </div>
                <div className="admin-sort col-md-6 ">
                    <div id="h5">
                        <h5> Sắp xếp giá theo </h5>
                    </div>
                    <div className="btn-sort">
                        <button onClick={()=>sortUp()} className="btn">Thấp - Cao <i class="fas fa-sort-amount-up"></i></button>
                        <button onClick={()=>sortDown()} className="btn">Cao - Thấp <i class="fas fa-sort-amount-down"></i></button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                {isVisible && <Modal footer={null} title="Edit" visible={true}  onCancel={()=>setIsvisible(false)}>
                                <div className="car-infor shadow rounded-3" style={{padding:'10px 20px', marginBottom:'15px', background:'orange', color:'white'}}>
                                    <h5 className="text-light">Sửa thông tin xe</h5>
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
                                        <Input placeholder="Nhập tên xe" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Giá"
                                        name="price"
                                        rules={[{ required: true, message: 'Vui lòng nhập giá tiền' }]}
                                    >
                                        <InputNumber  placeholder="Nhập giá tiền" style={{ width: '100%' }} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Số lượng"
                                        name="quantity"
                                        rules={[{ required: true, message: 'Vui lòng nhập số lượng xe' }]}
                                    >
                                        <InputNumber placeholder="Nhập số lượng xe"  style={{ width: '100%' }}  />
                                    </Form.Item>
                                    <Form.Item
                                        label="Hình ảnh"
                                        name="image"
                                        // rules={[{ required: true, message: 'Vui lòng nhập hình ảnh' }]}
                                        style={{marginTop:'30px'}}
                                    >
                                        <Input placeholder="Nhập tên xe" />
                                    </Form.Item>
                                    <Form.Item  {...tailLayout}>
                                        <button style={{ float:'right', backgroundColor:'orange', color:'white', width:'100px'}} type="submit" className="btn"> {loading?<Spin indicator={<LoadingOutlined style={{color: 'white'}}/>}/>:<span>Chỉnh sửa</span>}</button>
                                    </Form.Item>
                                </Form>
                            </Modal>}
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
                            {list.length > 0 ? list.map((car, index) => {
                                return (
                                    <tr className="list-car-row">
                                        <th scope="row"> {index + 1} </th>
                                        <td> {car.name}</td>
                                        {brand.length?brand.map(br => {
                                            if (car.idManufactor === br.idManufactor) {
                                                return (<td>{br.name}</td>);
                                            }
                                        }): <td>Loading...</td>}
                                        <td> {car.price} / Ngày</td>
                                        <td> {car.quantity}</td>
                                        <td style={{width: '70px'}} >
                                            <button onClick={() => openEditVehicleForm(car)} className="btn-edit"><i class="fal fa-edit"></i></button>
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