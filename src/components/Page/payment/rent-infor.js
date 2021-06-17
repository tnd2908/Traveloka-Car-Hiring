import { Form, Input } from "antd"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"

const RentInfor = ({car}) =>{
    const resultBill = useSelector(state => state.bill.newBill);
    const rentalInfo = JSON.parse(localStorage.getItem("rentalInfo"));
    const [rental, setRental] = useState({});
    const [startTime,setStartTime] = useState("");
    const [endTime,setEndTime] = useState("");
    const userInfo = useSelector(state => state.user.user)
    console.log(userInfo)
    useEffect(() => {
        setRental(rentalInfo);
    },[])
    console.log(userInfo);
    useEffect(() => {
        const startTimeString = Object.values(rentalInfo.startTime).map(date => date);
        const endTimeString = Object.values(rentalInfo.endTime).map(date => date)
        setStartTime(
            `${new Date(startTimeString.toString()).getFullYear()}-${new Date(startTimeString.toString()).getMonth()}-${new Date(startTimeString.toString()).getDate()}` 
        ); 
        setEndTime(
            `${new Date(endTimeString.toString()).getFullYear()}-${new Date(endTimeString.toString()).getMonth()}-${new Date(endTimeString.toString()).getDate()}`)
    },[])
    
    return(
        <div className="rent-info">
            <div className="rent-code" >
                <p>Mã đặt chỗ</p>
                <p>{resultBill.id}</p>
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
                    <p>Ngày và giờ băt đầu : {startTime} </p>
                    <p></p>
                </div>
                <div className="date-rent-end">
                    <p>Ngày và giờ kết thúc: {endTime}</p>
                    <p></p>
                </div>
            </div>
            <Form style={{marginLeft: "20px"}}>
                <Form.Item
                        label="Họ và tên:"
                        name="name"
                    >
                        {userInfo.fullname}
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại:"
                        name="phoneNum"
                    >
                        {userInfo.phone}    
                    </Form.Item>
                    <Form.Item
                        label="Gmail: "
                        name="gmail"
                       
                    >
                     {userInfo.email}    
                    </Form.Item>

                    <Form.Item
                        label="Địa chỉ nhận xe:"
                        name="address"
                        
                    >
                    {userInfo.userAddress}    
                    </Form.Item>
            </Form>
        </div>
    )
}
export default RentInfor