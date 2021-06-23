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
                        '#F8C471',
                        '#F8C471',
                        '#81D4FA',
                        '#85C1E9',
                        '#EC407A',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderWidth: 1,
                },
            ],
        })
    }, [])
    
    return (
        <div className="mt-5 mb-5">
            <h4>Sơ đồ xe được thuê nhiều nhất</h4>
            <Pie data={saledCar} />
        </div>
    )
}

export default SaledCarChart