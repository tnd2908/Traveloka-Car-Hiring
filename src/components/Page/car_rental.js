import '../../css/carRental.css';
import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';
import Car from './car';
import axios from 'axios';
import Category from './filter';
import { useDispatch, useSelector } from 'react-redux';
import { Collapse, Result, Skeleton } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons';
import { getListCarByPrice, getListCarFromHighPrice, getListCarFromLowPrice, setList } from '../../action/car';
import { setSchedule } from '../../action/schedule';

import HiringForm from './hiring-form';
import { Redirect, useLocation } from 'react-router-dom';
import { API_URL } from '../../util/util';

const { Panel } = Collapse

function CarRental() {
    const dispatch = useDispatch()

    const list = useSelector(state => state.car.listCar)
    const startDate = useSelector(state=>state.schedule.startDate)
    const endDate = useSelector(state=>state.schedule.endDate)
    const {search} = useLocation()
    const [isLoading, setIsLoading] = useState(true);
    const param = new URLSearchParams(search)
    const getPriceRange = (value) => {
        const action = getListCarByPrice(value)
        dispatch(action)
    }
    
    const sortPrice = (value) => {
        if (value === 'low') {
            const action = getListCarFromLowPrice(list)
            dispatch(action)
        }
        else if (value === 'high') {
            const action = getListCarFromHighPrice(list)
            dispatch(action)
        }
    }
    useEffect(() => {
        setIsLoading(true)
        getListCar();
        const action = setSchedule(param.get("dateStart"),param.get("dateEnd"))
        dispatch(action)
    }, [])

    const getListCar = () => {
        try {
            if(param.get("district")){
                axios.get(API_URL+`car/availableCar?idDistrict=${param.get("district")}`)
                .then(response => {
                    const action = setList(response.data.result, response.data.result)
                    dispatch(action)
                    
                })
            }
            else{
                axios.get(API_URL+`car/available/city?idCity=${param.get("city")}`)
                .then(response => {
                    const action = setList(response.data.result, response.data.result)
                    dispatch(action)
                    
                })
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const loadingSkeleton = () => {
        return (
            <Skeleton active/>
        )
    }
    if(param.get("country")){
        return (
            <div className="container-fluid bgcolor">
                <div className="row">
                    <div className="banner">
                        <div className="container">
                            <h3>Dịch vụ cho thuê xe ô tô đáp ứng mọi nhu cầu du lịch của bạn</h3>
                            <h5>Khám phá ngay những ưu đãi tốt nhất dành cho bạn tại Traveloka!</h5>
                        </div>
                    </div>
                </div>
                <div className="container main">
                    <div className="row">
                        <div className="form-container rent-infor rounded">
                            <Collapse
                            ghost
                                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                            >
                                <Panel header="Thay đổi thông tin thuê xe" key="1">
                                    <HiringForm />
                                </Panel>
                            </Collapse>
                            <h5 id="title-form">Thuê xe tự lái</h5>
                            <div className="rent-schedule-form">
                                <h6>Từ ngày {startDate} đến ngày {endDate} </h6>
                            </div>
                            {/* <p>Thuê xe / Thuê xe tự lái</p>
                            <h5>Thuê xe tự lái</h5>
                            <p style={{fontWeight:'bold', marginTop: '15px', color:'grey'}}><span style={{marginRight:'10px', fontSize: '20px'}}>Thành phố {city}</span> <span>{dateStart} đến {dateEnd} </span> </p> */}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <Category sortPrice={sortPrice} getPriceRange={getPriceRange} />
                        </div>
                        <div className="col-9">
                            <h6>Tìm thấy {list.length} loại xe</h6>
                            {list.length ? list.map(items => (
                                items ? <Car key={items.idVehicle} car={items} /> : <p>Không tìm thấy xe</p>
                            )): isLoading ? loadingSkeleton : <Result status="403"/>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return ( <Redirect to="/"/>)
}
export default CarRental