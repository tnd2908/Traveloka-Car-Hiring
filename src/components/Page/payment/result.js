import { Modal, Spin, Result } from "antd"
import { useSelector } from "react-redux"

const ResultPayment = (props) => {
    const bill = useSelector(state => state.bill.newBill)
    console.log(props)
    return (
        <Modal {...props}>
            {
                props.loadingPayment ? <Spin size="large"/> : props.result.data.status === "SUCCESS" ?
                    <Result 
                    status="success"
                    title="Thuê xe thành công"
                    subTitle={`Hóa đơn ${bill.id} của bạn đang được xử lí, chúng tôi sẽ liên lạc với bạn trong thời gian sớm nhất`}
                    /> : <Result 
                    status="500"
                    title="Thuê xe thất bại"
                    subTitle={`Hóa đơn ${bill.id} của bạn đã có vấn đề, xin vui lòng thử lại`}
                    /> 
            }
        </Modal>
    )
}
export default ResultPayment