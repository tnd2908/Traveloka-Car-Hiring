import Dashboard from './dashboard'
import '../../../css/payment.css'
import PaymentMethod from './payment-method';
const Payment = () => {
    return (
        <div className="container-fluid cover">
            <div className="container payment-page">
                <div className="row">
                    <div className="col-12">
                        <h5 id="payment-title">Thanh toán</h5>
                    </div>
                    <div className="col-md-9 d-flex">
                        <Dashboard />
                        <PaymentMethod/>
                    </div>
                    <div className="col-md-3">

                    </div>
                </div>
            </div>
        </div>
    );
}
export default Payment