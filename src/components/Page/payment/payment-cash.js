import {message, Switch} from 'antd'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { API_URL } from '../../../util/util'

const PaymentPage = ({car}) =>{
    const billId = useSelector(state => state.bill.newBill.id)
    const submitPayment = () => {
        axios.put(API_URL + "bill/" + billId)
        .then(res => message.success("Đơn hàng của bạn đã được thanh toán"))
        .catch(err => message.error("Đã có lỗi xảy ra vui lòng thử lại"))
    }
    return(
        <div>
            <div className="input-voucher">
                <div className="switch d-flex">
                    <Switch/>
                    <p>Nhập mã giảm giá</p>
                </div>
            </div>
            <div className="price-pay-detail pd-2">
                <p>Chi tiết giá</p>
                <div className="d-flex justify-content-between show-total-price-1">
                    <p>{car.name}</p>
                    <p>{new Intl.NumberFormat().format(car.self_drive_price)} VND</p>
                </div>
                <div className="d-flex justify-content-between show-total-price-2">
                    <p>Tổng tiền: </p>
                    <p id="final-price">{new Intl.NumberFormat().format(car.self_drive_price)} VND</p>
                </div>
            </div>
            <div className="d-flex justify-content-end end-pay pd-2">
                <p style={{width:'80%'}}>Bằng việc nhấn thanh toán, bạn đồng ý với <b>Điều khoản, điều kiện</b> và <b>Chính sách quyền riêng tư</b></p>
                <button onClick={submitPayment}>Thanh toán tại cửa hàng</button>
            </div>
        </div>
    )
}
export default PaymentPage