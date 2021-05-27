import {Switch} from 'antd'

const PaymentMethod = ({car}) =>{
    return(
        <div className="payment-method-cover">
            <div className="pd-2">
            <h5>Tại cửa hàng</h5>
            <h6>Lưu ý trước khi thanh toán</h6>
            <div className="border-box">
                <ul>
                    <li>Thanh toán phải được thực hiện trong thời hạn quy định và trong khung giờ kinh doanh của cửa hàng</li>
                    <li>Để tìm được cửa hàng gần nhất vui lòng xem <b>tại đây</b> </li>
                    <li>Bạn có thể tiến hành thanh toán tại 1 trong các cửa hàng sau</li>
                </ul>
                <img src="https://ik.imagekit.io/tvlk/image/imageResource/2018/08/15/1534319429277-7db9dcfaae850bda5d0630499079c303.png?tr=q-75" alt=""/>
            </div>
            </div>
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
                    <p>{new Intl.NumberFormat().format(car.price)} VND</p>
                </div>
                <div className="d-flex justify-content-between show-total-price-2">
                    <p>Tổng tiền: </p>
                    <p id="final-price">{new Intl.NumberFormat().format(car.price)} VND</p>
                </div>
            </div>
            <div className="d-flex justify-content-end end-pay pd-2">
                <p style={{width:'80%'}}>Bằng việc nhấn thanh toán, bạn đồng ý với <b>Điều khoản, điều kiện</b> và <b>Chính sách quyền riêng tư</b></p>
                <button>Thanh toán tại cửa hàng</button>
            </div>
        </div>
    )
}
export default PaymentMethod