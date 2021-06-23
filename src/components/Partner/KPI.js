import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { DEV_URL } from "../../util/util";

const KPI = (props) => {
    const [monthRevenue, setMonthRevenue] = useState({}),
    userInfo = useSelector(state => state.user.user)

    useEffect(() => {
        setMonthRevenue({
            labels: props.data.map(item => `Tháng ${item.month}`),
            datasets: [
                    {
                        label: 'Tổng tiền',
                        data: props.data.map(item => item.total),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                    }
                ]
            })
    },[userInfo.partnerId])

    return (
        <div className="container mt-5">
            <h4>Biểu đồ doanh thu hàng tháng trong năm</h4>
            <Bar data={monthRevenue}/>
        </div>
    )
}

export default KPI;