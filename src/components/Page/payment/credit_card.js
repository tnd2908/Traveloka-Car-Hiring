import { Button, Card, Input, message, Spin } from "antd"
import {Elements,CardElement,useStripe,useElements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { Fragment } from "react";
import StripeCheckout from "react-stripe-checkout"
import { getVisaPaymnet } from "../../../action/bill"
import {Form} from "antd";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const paymentIcons = [
    {
        code: 'TB',
        name: 'TPBANK',
        icon: 'https://monfin.vn/images/source/thebank_tpbank_1539081891.jpg'
    },
    {
        code: 'ARB',
        name: "Agribank",
        icon: 'data:image/png;base64,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'
    },
    {
        code: 'DA',
        name: "Dong A",
        icon: 'data:image/jpeg;base64,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'
    },
    {
        code: 'SH',
        name: "Shinhan",
        icon: 'data:image/jpeg;base64,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'
    }
]

const CreditCard = () => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.user.user);
    const billAddress = useSelector(state => state.bill.newBill);
    const price = localStorage.getItem("carPrice");
    const carName = localStorage.getItem("carName");
 
    const submitPayment = async (e) => {
        const billingDetail = {
            name: userInfo.fullname || "",
            phone: userInfo.phone,
            address: billAddress.address,
            email: userInfo.email
        }

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
          }
      
          // Get a reference to a mounted CardElement. Elements knows how
          // to find your CardElement because there can only ever be one of
          // each type of element.
          const cardElement = elements.getElement(CardElement);
      
          // Use your card Element with other Stripe.js APIs
          const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: billingDetail
          });
      
          if (error) {
            console.log('[error]', error);
            message.error("Thẻ không hợp lệ vui lòng thử lại")
          } else {
            console.log('[PaymentMethod]', paymentMethod);
            const visaInfo = {
                ...billingDetail,
                card: paymentMethod.type,
                id: paymentMethod.id,
                method: paymentMethod.card.brand,
                amount: price,
                car: carName
            }
            axios.post("http://localhost:3301/" + "bill/stripe", visaInfo)
            .then(res => console.log(res))
            dispatch(getVisaPaymnet(visaInfo));
        
            message.success("Liên kết thẻ thành công")
          }
    }

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 12 },
    };

    const CARD_OPTIONS = {
        iconStyle: "solid",
        style: {
            base: {
                iconColor: "#87bbfd",
                color: "#87bbfd",
                fontWeight: 500,
                fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                fontSize: "16px",
                fontSmoothing: "antialiased",
                ":-webkit-autofill": {
                color: "#fce883"
            },
            "::placeholder": {
                color: "#87bbfd"
            }
          },
            invalid: {
                iconColor: "#ffc7ee",
                color: "#ffc7ee"
            }
        }
    };

    return (
        <Fragment>
            <Card style={{height:'auto'}} title="Payment detail" description="testing">
                {
                    paymentIcons.length > 0 ? <div className="row pb-5">
                        { paymentIcons.map(payment =><div className="col bank-image"> 
                            <img  key={payment.code} src={payment.icon}/>
                        </div>
                        )}
                    </div>  : <div><Spin size="large"/></div>
                }
                <Form 
                    {...layout}
                    onFinish={submitPayment}>
                    <CardElement className="mb-5 mt-5" options={CARD_OPTIONS}/>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Liên kết thẻ
                        </Button>
                    </Form.Item>
                    
                </Form>
            </Card>
        </Fragment>
    )
}

export default CreditCard