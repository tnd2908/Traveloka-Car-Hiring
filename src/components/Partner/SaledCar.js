import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

const SaledCarChart = (props) => {
    const [saledCar, setSaledCar] = useState({});
    useEffect(() => {
        setSaledCar({
            labels: props.data.map(item => item.name),
            datasets: [
                {
                    label: 'Số lượng xe đã bán',
                    data: props.data.map(item => item.HiredCount),
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
                },
            ],
        })
    }, [])
    
    return (
        <div className="mt-5 mb-5">
            <h4>Sơ đồ số lượng xe đã cho thuê</h4>
            <Pie data={saledCar} />
        </div>
    )
}

export default SaledCarChart