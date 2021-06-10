import { Table, Tag, Descriptions, Badge } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setPartnerInfor } from '../../action/partner'
import { API_URL } from '../../util/util'
const { Column } = Table
const ListBill = () => {
    const [bill, setBill] = useState([])
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false)
    const [billDetail, setBillDetail] = useState({
        startDate: '',
        endDate: '',
    })
    useEffect(() => {
        try {
            const header = { 'Authorization': localStorage.getItem("partner-token") }
            axios.get("https://oka1kh.azurewebsites.net/api/profiles", {
                headers: header
            })
                .then(res => {
                    const action = setPartnerInfor(res.data.data.rolePartner[0])
                    dispatch(action)
                    axios.get(API_URL + "bill/saler/" + res.data.data.rolePartner[0].partnerId)
                        .then(response => {
                            console.log(response.data.result)
                            setBill(response.data.result)
                        })
                })
        } catch (error) {
            console.log(error)
        }
    }, [])

    const showDetail = (data) => {
        setVisible(true)
        setBillDetail(data)
    }
    const start = billDetail.startDate.split(" ").slice(2,3)[0]
    const end = billDetail.endDate.split(" ").slice(2,3)[0]
    return (
        <div className="container compo mt-5">
            <div className="row">
            <Modal width={1000} footer={false} visible={visible} onCancel={()=>setVisible(false)}>
                <Descriptions title="Chi tiết đơn đặt" bordered>
                    <Descriptions.Item label="Số điện thoại KH" >
                        {billDetail.phone?<span>{billDetail.phone}</span>:<span>0909123456</span>}
                    </Descriptions.Item>
                    <Descriptions.Item label="Trạng thái" span={2}>
                        {billDetail.status === "In progress"?<Tag color="processing"> {billDetail.status} </Tag>
                        :<Tag color="gold"> {billDetail.status} </Tag>}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày nhận">
                        {billDetail.startDate}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày trả" span={2}>
                        {billDetail.endDate}
                    </Descriptions.Item>
                    <Descriptions.Item label="Địa chỉ" span={3}>
                        {billDetail.address}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tên xe"> {billDetail.name} </Descriptions.Item>
                    <Descriptions.Item label="Giá theo ngày"> {new Intl.NumberFormat().format(billDetail.total)} VND</Descriptions.Item>
                    <Descriptions.Item label="Số ngày">
                        {end - start}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tổng tiền">
                        <h6 style={{marginBottom:'0'}}>
                            <b>{new Intl.NumberFormat().format(billDetail.total*(end-start))} VND</b>
                        </h6>
                    </Descriptions.Item>
                </Descriptions>
            </Modal>
                <Table
                    bordered
                    dataSource={bill}
                >
                    <Column title="Ngày nhận" dataIndex="startDate" key="startDate" />
                    <Column title="Ngày trả" dataIndex="endDate" key="endDate" />
                    <Column title="Trạng thái" key="status"
                        render={data => {
                            if (data.status === "In progress")
                                return <Tag color="processing"> {data.status} </Tag>
                            else
                                return <Tag color="gold"> {data.status} </Tag>
                        }}
                    />
                    <Column title="Số điện thoại" key="total"
                        render={data => (
                            <span> {data.phone?data.phone:"0909123456"} </span>
                        )}
                    />
                    <Column title="Địa chỉ" dataIndex="address" key="address" />
                    <Column title="Hành động" key="action" width="120px"
                        render={action => (
                            <div className="d-flex">
                                <button onClick={() => { showDetail(action) }} className="btn-detail">Chi tiết</button>
                            </div>
                        )}
                    />
                </Table>
            </div>
        </div>
    )
}
export default ListBill