import { Form, Input, InputNumber, Select, Modal } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios'
const { Option } = Select
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
const AddCar = () => {
    const [category, setCategory] = useState([])
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [idCategory, setIdCategory] = useState('')
    const [idManufactor, setIdManufactor] = useState('')
    const [brand,setBrand] = useState([])
    const getCategoryData = () =>{
        try {
            axios.get("https://mighty-meadow-74982.herokuapp.com/cate")
                .then(response=>{
                    setCategory(response.data.data)
                    console.log(category)
                })
        } catch (error) {
            console.log(error)
        }
    }
    const getManufactorData = () =>{
        try {
            axios.get("https://mighty-meadow-74982.herokuapp.com/manufactor")
            .then(response=>{
                setBrand(response.data.data)
                console.log(response.data.data)
            })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{                                                         
        getCategoryData();
        getManufactorData();
    },[])
    const onIdManufactorChange = (value) =>{
        setIdManufactor(value.value)
    }
    const onIdCategoryChange = (value) =>{
        setIdCategory(value.value)
    }
    const onNameChange = (e) =>{
        setName(e.target.value)
    }
    const onPriceChange = (value) =>{
        setPrice(value)
    }
    const onQuantityChange = (value) =>{
        setQuantity(value)
    }
    const handleCreateCar = () =>{
        try {
            const data = {
                name,
                price,
                quantity,
                idCategory,
                idManufactor,
            }
            axios.post('https://mighty-meadow-74982.herokuapp.com/vehicle', data)
                .then(response=>{
                    Modal.success({
                        content: response.data.result,
                        onOk: ()=>{
                            
                        }
                    })
                    console.log(response)
                })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="container-fluid component">
            <div className="row" >
                <div className="form">
                    <Form
                        {...layout}
                        name="basic"
                        style={{backgroundColor: '#fff', boxShadow:'1px 5px 15px rgba(0, 0, 0, 0.2)', borderRadius:'7px', overflow:'hidden',margin:'auto', maxWidth:'700px'}}
                        initialValues={{ remember: false }}
                        onFinish={handleCreateCar}
                    >
                        <Form.Item className="form-header"><h5>Th??m xe m???i</h5></Form.Item>
                        <Form.Item
                            label="T??n xe"
                            name="name"
                            rules={[{ required: true, message: 'Vui l??ng nh???p t??n xe' }]}
                        >
                            <Input name="name" value={name} onChange={onNameChange} placeholder="Nh???p t??n xe"/>
                        </Form.Item>

                        <Form.Item
                            label="Gi??"
                            name="price"
                            rules={[{ required: true, message: 'Vui l??ng nh???p gi?? ti???n' }]}
                        >
                            <InputNumber placeholder="Nh???p gi?? ti???n" name="price" value={price} style={{width:'40%'}} onChange={onPriceChange}/>
                        </Form.Item>
                        <Form.Item
                            label="S??? l?????ng"
                            name="quantity"
                            rules={[{ required: true, message: 'Vui l??ng nh???p s??? l?????ng xe' }]}
                        >
                            <InputNumber placeholder="Nh???p s??? l?????ng xe" name="quantity" value={quantity} style={{width:'40%'}} onChange={onQuantityChange} />
                        </Form.Item>
                        <Form.Item
                            label="S??? ch??? ng???i"
                            name="idCategory"
                            rules={[{ required: true, message: 'Vui l??ng ch???n s??? ch??? ng???i' }]}
                        >
                            <Select
                                labelInValue
                                placeholder="S??? ch???"
                                onChange={onIdCategoryChange}
                                name="idCategory"
                                value={idCategory}
                            >
                                {category.map((idCategory, index)=>(
                                    <Option key={index} value={idCategory.idCategory}>{idCategory.nameCate} ch???</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        
                        <Form.Item
                            label="H??ng s???n xu???t"
                            name="idManufactor"
                            rules={[{ required: true, message: 'Vui l??ng ch???n h??ng xe' }]}
                        >
                            <Select
                                labelInValue
                                placeholder="H??ng s???n xu???t"
                                onChange= {onIdManufactorChange}
                                name="idManufactor"
                                value={idManufactor}
                            >
                                {brand.map((id, index)=>(
                                    <Option key={index} value={id.idManufactor}> {id.name} </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <button className="btn-add"><i class="fal fa-plus-circle"></i>Th??m xe</button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}
export default AddCar