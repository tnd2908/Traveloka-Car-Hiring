import Dashboard from './dashboard'
import '../../../css/payment.css'
import PaymentMethod from './payment-method';
import RentInfor from './rent-infor';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
const Payment = () => {
    let { idVehicle } = useParams();
    const [car,setCar] = useState({})

    useEffect(() => {
        fetchDetail();
    }, [])
    const fetchDetail = () => {
        try {
            axios.get(`https://mighty-meadow-74982.herokuapp.com/vehicle/detail/${idVehicle}`)
                .then(response => {
                    setCar(response.data.data)
                })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="container-fluid cover">
            <div className="container payment-page">
                <div className="row">
                    <div className="col-12">
                        <h5 id="payment-title">Thanh toán</h5>
                    </div>
                    <div className="col-md-9 d-flex">
                        <Dashboard />
                        <PaymentMethod car = {car}/>
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