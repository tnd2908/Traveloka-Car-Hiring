import { Form, Input, InputNumber, Select, Upload, message, Modal } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios'
import {
    PlusOutlined,
    LoadingOutlined,
} from '@ant-design/icons';
import { API_URL } from '../../util/util';
import { useSelector } from 'react-redux';
const { Option } = Select
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }
const AddCar = () => {
    const [form] = Form.useForm();
    const [imageName, setImageName] = useState("");
    const [brand,setBrand] = useState([])
    const [loading,setLoading] = useState(false)
    const [image, setImage] = useState("");
    const [imageURL, setImageURL] = useState("");
    const partner = useSelector(state=>state.partner.partner)
    const getManufactorData = () =>{
        try {
            axios.get(API_URL+"manu")
            .then(response=>{
                setBrand(response.data.result)
            })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{                                                         
        getManufactorData();
    },[])
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    const addAvatar = info => {
        if (info.file.status === 'uploading') {
          setLoading(true)
          return;
        }
        else if (info.file.status === 'error') {
            setLoading(false)
            message.error("Fail to upload")
            return;
          }
        else if (info.file.status === "done") {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (imageUrl) => {
              setImage(info.file.originFileObj);
      
              setImageName(info.file.name);
              setImageURL(imageUrl);
              setLoading(false);
            });
          }
    }
    
    
    const handleCreateCar = (value) =>{
        try {
            const {name, self_drive_price, quantity, Seat, typeCar ,idManufactor} = value;
            const data = {
                name,
                self_drive_price,
                quantity,
                Seat,
                typeCar,
                idManufactor,
                idSaler: partner.partnerId
            }
            axios.post(API_URL+"car", data)
                .then(response=>{
                    if(response.data.status === 'SUCCESS'){
                        Modal.success({
                            content: response.data.result,
                            onOk: ()=>{
                                const obj ={
                                    name: '',
                                    self_drive_price: '',
                                    quantity: '',
                                    idManufactor: '',
                                    Seat: '',
                                    typeCar: ''
                                }
                                  form.setFieldsValue(obj)
                            }
                        })
                    }
                    else{
                        Modal.error({
                            content: response.data.error.message
                        })
                    }
                    console.log(response.data)
                })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="container component">
            <div className="row" >
                <div className="form">
                    <Form
                        id="form"
                        {...layout}
                        name="basic"
                        style={{backgroundColor: '#fff',boxShadow:'1px 5px 15px rgba(0, 0, 0, 0.2)', borderRadius:'7px', overflow:'hidden',margin:'auto', maxWidth:'700px'}}
                        initialValues={{ remember: false }}
                        form={form}
                        onFinish={handleCreateCar}
                    >
                        <Form.Item className="form-header"><h5>Thêm xe mới</h5></Form.Item>
                        <Form.Item
                            label="Tên xe"
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập tên xe' }]}
                        >
                            <Input  placeholder="Nhập tên xe"/>
                        </Form.Item>
                        <Form.Item
                            label="Giá"
                            name="self_drive_price"
                            rules={[{ required: true, message: 'Vui lòng nhập giá tiền' }]}
                        >
                            <InputNumber placeholder="Nhập giá tiền"  style={{width:'40%'}} />
                        </Form.Item>
                        <Form.Item
                            label="Số lượng"
                            name="quantity"
                            rules={[{ required: true, message: 'Vui lòng nhập số lượng xe' }]}
                        >
                            <InputNumber placeholder="Nhập số lượng xe"  style={{width:'40%'}}  />
                        </Form.Item>
                        <Form.Item
                            label="Số chỗ ngồi"
                            name="Seat"
                            rules={[{ required: true, message: 'Vui lòng chộn số chỗ ngồi' }]}
                        >
                            <Select
                                placeholder="Số chỗ"
                                name="Seat"
                            >
                                <Option key="4" value="4">4 chỗ</Option>
                                <Option key="5" value="5">5 chỗ</Option>
                                <Option key="7" value="7">7 chỗ</Option>
                                <Option key="16" value="16">16 chỗ</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Loại xe"
                            name="typeCar"
                            rules={[{ required: true, message: 'Vui lòng loại xe' }]}
                        >
                            <Select
                                placeholder="Số chỗ"
                                name="typeCar"
                            >
                                <Option key="Số tự động" value="4">Số tự động</Option>
                                <Option key="Số sàn" value="5">Số sàn</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Hãng sản xuất"
                            name="idManufactor"
                            rules={[{ required: true, message: 'Vui lòng chọn hãng xe' }]}
                        >
                            <Select
                                placeholder="Hãng sản xuất"
                                name="idManufactor"
                            >
                                {brand.map(id=>(
                                    <Option key={id.id}> {id.name} </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Hình ảnh"
                            name="avatar"
                            rules={[{ required: false, message: 'Vui lòng chọn hình ảnh' }]}
                        >
                            <Upload
                                listType="picture-card"
                                className="avatar-uploader"
                                beforeUpload={beforeUpload}
                                showUploadList={false}
                                onChange={addAvatar}
                            >
                                {imageURL?<img src={imageURL} alt="avatar"/>:uploadButton}
                            </Upload>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <button className="btn-add">Thêm xe</button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}
export default AddCar