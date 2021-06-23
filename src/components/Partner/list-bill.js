import { Table, Tag, Descriptions, Badge, Row, Col, Statistic, Popconfirm, message } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setPartnerInfor } from '../../action/partner'
import { API_URL, DEV_URL } from '../../util/util'
import moment from "moment";

const { Column } = Table
const ListBill = () => {
    const [bill, setBill] = useState([])
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false)
    const [totalVisa, setTotalVisa] = useState(0);
    const [totalCurrent, setTotalCurrent] = useState(0);
    const [total, setTotal] = useState(0);
    const [result, setResult] = useState(0);
    const [isPopconfirm, setIsPopconfirm] = useState(false);
    const [isPopCarRetake, setIsPopCarRetake] = useState(false);
    const [listExpireBill, setListExpireBill] = useState([]);
    const [submitModal, setSubmitModal] = useState(false);
    const [carRetakeModal, setCarRetakeModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [billDetail, setBillDetail] = useState({
        startDate: '',
        endDate: '',
    })
    const target = 100000000;
    const partnerInfo = useSelector(state => state.user.user)

    useEffect(() => {
        try {  
            if(partnerInfo.partnerId) {
                setIsLoading(true);
                axios.get(API_URL + "bill/saler/" + partnerInfo.partnerId)
                .then(response => {
                    let totalPrice = 0;
                    let expireArr = [];
                    response.data.result.map(item => {
                        console.log(item)
                        const startDay = item.startDate.split(" ").slice(2,3)[0];
                        const endDay = item.endDate.split(" ").slice(2,3)[0];
                        if(item.payment === "cash") {
                            if(item.status === "Waiting" && Math.abs((new Date - new Date(item.created_at)) / 365) > 48) {
                            //Hủy bill 
                            }
                            if(item.status === "In progress") {
                                console.log(total + item.total * (endDay - startDay) *  50/100)
                                setTotal(total + item.total * (endDay - startDay) *  50/100)
                            }
                            if (new Date(item.endDate) <= new Date && item.status !== "DONE") {
                                //setTotal(total + item.total * (endDay - startDay) *  50/100)
                                expireArr.push(item)
                            }
                            if(item.status === "DONE") {
                                setTotal(total + item.total * (endDay - startDay) *  50/100)
                            }
                        }
                        else if(item.payment === "visa") {
                            if(item.status === "Waiting" && Math.abs((new Date - new Date(item.created_at)) / 36e5) > 48) {
                                //Hủy bill 
                            }
                            if(item.status === "In progress") {
                                setTotalVisa(totalVisa + item.total * (endDay - startDay) *  50/100)
                            }
                            if (new Date(item.endDate) <= new Date && item.status !== "DONE") {
                                //setTotal(total + item.total * (endDay - startDay) *  50/100)
                                expireArr.push(item)
                            }
                            if(item.status === "DONE") {
                                setTotalVisa(totalVisa + item.total * (endDay - startDay) *  50/100)
                            }
                        }
                        setListExpireBill(expireArr);
                    })
                    setBill(response.data.result);
                    setIsLoading(false);
                })
            }
        } catch (error) {
            console.log(error)
        }
    }, [partnerInfo.partnerId])

    useEffect(() => {
        const current = total + totalVisa;
        setTotalCurrent(current);
    }, [total, totalVisa])
    
    useEffect(() => {
        if(listExpireBill.length > 0) {
            setIsPopCarRetake(true);
        }
    }, [listExpireBill.length])

    useEffect(() => {
        setResult(total/target * 100)
    }, [total])

    useEffect(() => {   
        const currentDay = new Date;
        const lastDayOfCurrentMonth = new Date(currentDay.getFullYear(), currentDay.getMonth() + 1, 0);
        if(Math.round(currentDay - lastDayOfCurrentMonth) >= 0) {
            setIsPopconfirm(true);
        }
        else {
            setIsPopconfirm(false);
        }
    }, [])

    const showDetail = (data) => {
        setVisible(true)
        setBillDetail(data)
    }
    const start = billDetail.startDate.split(" ").slice(2,3)[0]
    const end = billDetail.endDate.split(" ").slice(2,3)[0]

    const handleConfirmOK = () => {
        setSubmitModal(true);
        setIsPopconfirm(false);
    }

    const handleConfirmCancel = () => {
        setIsPopconfirm(false);
    }

    const handleSubmitOK = () => {
        const newKPI = {
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
            partnerId: partnerInfo.partnerId || "",
            total: total || 0,
            result: result || 0
        }
        axios.post(DEV_URL + "bill/KPI", newKPI)
        .then(res => {
            setSubmitModal(false);
            message.success("Lưu KPI thành công")
            setListExpireBill([])
        })
    }

    const handleSubmitCancel = () => {
        setSubmitModal(false)
    }

    const handleAlertRetake = () => {
        setIsPopCarRetake(false);
        setCarRetakeModal(true);
    }

    const handleAlertCancel = () => {
        setIsPopCarRetake(false);
    }
    console.log(bill)
    const handleRetakeOk = () => {
        listExpireBill.map(item => {
            console.log(item);
            axios.get(API_URL + "bill/endDate/" + item.idBill + "?endDate=" + item.endDate)
            .then(res => {
                console.log(res)
                message.success("Duyệt hóa đơn thành công",4)
                setCarRetakeModal(false);
            })
        })
    }

    const handleRetakeCancel = () => {
        setCarRetakeModal(false);
    }

    return (
        <div className="container compo mt-5">
            <div className="row">
                <h3>Báo cáo doanh thu theo tháng</h3>

                <Popconfirm
                    title={`Có hóa đơn đến hạn trả xe, bạn muốn xác nhận chứ`}
                    visible={isPopCarRetake}
                    onConfirm={handleAlertRetake}
                    onCancel={handleAlertCancel}
                >
                </Popconfirm>

                <Popconfirm
                    title={`Tháng ${new Date().getMonth() } sắp hết, bạn muốn chốt sổ chứ`}
                    visible={isPopconfirm}
                    onConfirm={handleConfirmOK}
                    onCancel={handleConfirmCancel}
                >
                </Popconfirm>

                <Modal width={1000} footer={false} visible={visible} onCancel={()=>setVisible(false)}>
                    <Descriptions title="Chi tiết đơn đặt" bordered>
                        <Descriptions.Item label="Số điện thoại KH" >
                            {billDetail.phone?<span>{billDetail.phone}</span>:<span>0909123456</span>}
                        </Descriptions.Item>
                        <Descriptions.Item label="Trạng thái" span={2}>
                            {billDetail.status === "In progress"?<Tag color="processing"> {billDetail.status} </Tag>
                        : billDetail.status === "DONE" ? <Tag color="green"> {billDetail.status} </Tag> : <Tag color="gold"> {billDetail.status} </Tag>}
                        </Descriptions.Item>
                        <Descriptions.Item label="Ngày nhận">
                            {billDetail.startDate}
                        </Descriptions.Item>
                        <Descriptions.Item label="Ngày trả" span={2}>
                            {billDetail.endDate}
                        </Descriptions.Item>
                        <Descriptions.Item label="Địa chỉ" span={3}>
                            {billDetail.address}
                        </Descriptions.Item>
                        <Descriptions.Item label="Tên xe"> {billDetail.name} </Descriptions.Item>
                        <Descriptions.Item label="Giá theo ngày"> {new Intl.NumberFormat().format(billDetail.total)} VND</Descriptions.Item>
                        <Descriptions.Item label="Số ngày">
                            {end - start}
                        </Descriptions.Item>
                        <Descriptions.Item label="Tổng tiền">
                            <h6 style={{marginBottom:'0'}}>
                                <b>{new Intl.NumberFormat().format(billDetail.total*(end-start))} VND</b>
                            </h6>
                        </Descriptions.Item>
                    </Descriptions>
                </Modal>

                <Modal
                    visible={submitModal}
                    onOk={handleSubmitOK}
                    onCancel={handleSubmitCancel}
                    className="container"
                >
                    <h3>Bảng chốt sổ doanh thu tháng {new Date().getMonth()}</h3>
                    <h5 className="mt-3 mb-3">Tên chủ xe: {partnerInfo.partnerUsername}</h5>
                    <Row gutter={16} className="container">
                        
                        
                        <Col span={8}>
                            <Statistic title="Doanh thu hiện tại" value={total}/>
                        </Col>
                        <Col span={8}>
                            <Statistic title="Tháng hiện tại" value={`${new Date().getMonth()}/${new Date().getFullYear()}`}/>
                        </Col>
                        <Col span={8}>
                            <Statistic title="Chỉ tiêu đặt ra" value={target}/>
                        </Col>
                        <Col span={8}>
                            <Statistic title="Phần trăm đạt được" value={totalCurrent/target * 100}/>
                        </Col>
                    </Row>
                </Modal>

                <Modal
                    visible={carRetakeModal}
                    onOk={handleRetakeOk}
                    onCancel={handleRetakeCancel}
                >
                    <h3>Danh sách hóa đơn đến hạn trả xe</h3>
                    <h5 className="mt-3 mb-3">Tên chủ xe: {partnerInfo.partnerUsername}</h5>
                    {
                        // listExpireBill.map(item => <Row gutter={64} className="container">
                        //     <Col span={8}>
                        //         <Statistic  title="Mã hóa đơn" value={item} formatter={value => <text>{value.idBill.substr(0,5)}</text>}/>
                        //     </Col>
                        //     <Col span={8}>
                        //         <Statistic title="Ngày kết thúc" value={item} formatter={value => <text>{moment(value.endDate).format("YYYY-MM-DD hh:mm")}</text>}/>
                        //     </Col>
                        //     <Col span={8}>
                        //         <Statistic title="id người mua" value={item} formatter={value => <text>{value.idUser.substr(0,5)}</text>}/>
                        //     </Col>
                        //     <Col span={8}>
                        //         <Statistic title="Tổng tiền" value={item} formatter={value => <text>{value.total}</text>}/>
                        //     </Col>
                        // </Row>)

                        <Table
                            className="mt-5"
                            bordered
                            dataSource={listExpireBill}
                        >
                            <Column title="Mã hóa đơn" key="idBill" dataIndex="idBill" render={idBill => <span>{idBill.substr(0,6)}</span>}/>
                            <Column title="Ngày kết thúc" key="idBill" dataIndex="endDate" render={endDate => <span>{endDate}</span>}/>
                            <Column title="id người mua" key="idUser" dataIndex="idUser" render={idUser => <span>{idUser.substr(0,6)}</span>}/>
                            <Column title="Tổng tiền" key="total" dataIndex="total" render={total => <span>{total}</span>}/>
                        </Table>
                    }
                </Modal>

                <Row className="mt-5" gutter={16}>
                    <Col span={8}>
                        <Statistic title=" Tổng doanh thu hiện tại" value={totalCurrent + " VND"} precision={2}/>
                    </Col>
                    <Col span={8}>
                        <Statistic title=" Tổng doanh thu tiền mặt" value={total + " VND"} precision={2}/>
                    </Col>
                    <Col span={8}>
                        <Statistic title=" Tổng doanh thu visa" value={totalVisa + " VND"} precision={2}/>
                    </Col>
                    <Col span={8}>
                        <Statistic title="Tháng hiện tại" value={new Date().getMonth() +1}/>
                    </Col>
                    <Col span={8}>
                            <Statistic title="Chỉ tiêu đặt ra" value={new Intl.NumberFormat().format(target) + " VND"}/>
                        </Col>
                    <Col span={8}>
                        <Statistic title="Phần trăm đạt được" value={(totalCurrent/target) * 100} precision={2}/>
                    </Col>
                </Row>

                <Table
                    className="mt-5"
                    bordered
                    dataSource={bill}
                    loading={isLoading}
                >
                    <Column title="Ngày nhận nè" dataIndex="startDate" render={time => moment(time).format("YYYY-MM-DD hh:mm")}  key="startDate" />
                    <Column title="Ngày trả" dataIndex="endDate" render={time => moment(time).format("YYYY-MM-DD hh:mm")} key="endDate" />
                    <Column title="Trạng thái" key="status"
                        render={data => {
                            if (data.status === "In progress")
                                return <Tag color="processing"> {data.status} </Tag>
                            if(data.status === "DONE") 
                                return <Tag color="green"> {data.status} </Tag>
                            else
                                return <Tag color="gold"> {data.status} </Tag>
                        }}
                    />
                    <Column title="Số điện thoại" key="total"
                        render={data => (
                            <span> {data.phone ? data.phone : "0909123456"} </span>
                        )}
                    />
                    <Column title="Địa chỉ" dataIndex="address" key="address" />
                    <Column title="Hành động" key="action" width="120px"
                        render={action => (
                            <div className="d-flex">
                                <button onClick={() => {showDetail(action)}} className="btn-detail">Chi tiết</button>
                            </div>
                        )}
                    />
                </Table>
            </div>
        </div>
    )
}
export default ListBill