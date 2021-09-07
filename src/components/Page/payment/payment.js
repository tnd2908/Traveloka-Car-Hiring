import Dashboard from './dashboard'
import '../../../css/payment.css'
import PaymentPage from './payment-cash';
import RentInfor from './rent-infor';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { API_URL } from '../../../util/util';
import { useSelector } from 'react-redux';
import { Statistic, Modal } from 'antd';
const Payment = (props) => {
    let { idVehicle } = useParams();
    const [car,setCar] = useState({});
    useEffect(() => {
        fetchDetail();
    }, [])
    const fetchDetail = () => {
        try {
            axios.get(API_URL + "car/detail/" + idVehicle)
                .then(response => {
                    setCar(response.data.result)
                })
        } catch (error) {
            console.log(error)
        }
    }
    const onFinish = ()=>{
        console.log(1)
        Modal.info({
            title: 'Đã hết thời gian thanh toán',
            onOk(){window.location = "/"}
        })
    }
    const {Countdown} = Statistic
    const deadline = Date.now() + 1000*300
    return (
        <div className="container-fluid cover">
            <div className="container payment-page">
                <div className="row">
                    <div className="col-12 mb-3">
                        <h4 id="payment-title">Thanh toán</h4>
                        <Countdown title="Thời gian còn lại" value={deadline} onFinish={onFinish} />
                    </div>
                    <div className="col-md-9 d-flex container">
                        <Dashboard car={car} />
                        <div className="row payment-method-cover ml-3">
                            {props.children}
                            <PaymentPage car={car} />
                        </div>
                        
                    </div>
                    <div className="col-md-3">
                        <RentInfor car = {car}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Payment