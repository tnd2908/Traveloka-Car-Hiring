import { Table} from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setPartnerInfor } from '../../action/partner'
import { API_URL } from '../../util/util'
const { Column } = Table
const ListBill = () =>{
    const [bill,setBill] = useState([])
    const dispatch = useDispatch()
    useEffect(()=>{
        try {
            const header = {'Authorization': localStorage.getItem("partner-token")}
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
    },[])
    return(
        <div className="container compo mt-5">
            <div className="row">
            <Table
                bordered
                dataSource={bill}
            >
                <Column title="Ngày nhận" dataIndex="startDate" key="startDate" />
                <Column title="Ngày trả" dataIndex="endDate" key="endDate" />
                <Column title="Trạng thái" dataIndex="status" key="endDate" />
                <Column title="Tổng tiển"  key="total" 
                    render={data=>(
                        <span> {new Intl.NumberFormat().format(data.total)} VND</span>
                    )}
                />
                <Column title="Địa chỉ" dataIndex="address" key="address" />
                <Column title="Hành động" key="action" width="120px"
                    render={action => (
                        <div className="d-flex">
                            <button className="btn-detail">Detail</button>
                        </div>
                    )}
                />
            </Table>
            </div>
        </div>
    )
}
export default ListBill