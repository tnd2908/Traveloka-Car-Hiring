import {Switch} from 'antd'

const PaymentPage = ({car}) =>{
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
                <button>Thanh toán tại cửa hàng</button>
            </div>
        </div>
    )
}
export default PaymentPage