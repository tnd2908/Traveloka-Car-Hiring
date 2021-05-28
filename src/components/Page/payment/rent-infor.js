const RentInfor = ({car}) =>{
    return(
        <div className="rent-info">
            <div className="rent-code" >
                <p>Mã đặt chỗ</p>
                <p>7688978</p>
            </div>
            <div className="rent-details">
                <h5> {car.name} </h5>
                <div className="car-detail-rent">
                    <p>Số sàn</p>
                    <p>Cung cấp bởi</p>
                </div>
                <div className="city-rent">
                    <p>Thành phố / khu vực thuê xe</p>
                    <p></p>
                </div>
                <div className="date-rent-start">
                    <p>Ngày và giờ băt đầu</p>
                    <p></p>
                </div>
                <div className="date-rent-end">
                    <p>Ngày và giờ kết thúc</p>
                    <p></p>
                </div>
            </div>
            <div className="rent-cus">
                <h4>HÀNH KHÁCH</h4>
                
            </div>
        </div>
    )
}
export default RentInfor