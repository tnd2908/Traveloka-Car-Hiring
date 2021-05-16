import '../../css/carRental.css';
import 'antd/dist/antd.css';

import React, { useEffect, useState } from 'react';
import Car from './car';
import axios from 'axios';
import Category from './filter';
import { useDispatch, useSelector } from 'react-redux';
import { getListCarByPrice, getListCarFromHighPrice, getListCarFromLowPrice, setList } from '../../action/car';
function CarRental(){
    const [dateStart, setDateStart] = useState()
    const [dateEnd, setDateEnd] = useState()
    const [city, setCity] = useState()
    const dispatch = useDispatch()
    const list = useSelector(state => state.car.listCar)
    const defaultList = useSelector(state => state.car.defaultList)
    const getPriceRange = (value) =>{
        const action = getListCarByPrice(value)
        dispatch(action)
    }

    const sortPrice = (value) =>{
        if(value === 'low'){
            const action = getListCarFromLowPrice(list)
            dispatch(action)
        }
        else if(value === 'high'){
            const action = getListCarFromHighPrice(list)
            dispatch(action)
        }
    }
    useEffect(()=>{
        const date1 = localStorage.getItem('DateStart')
        setDateStart(date1)
        const date2 = localStorage.getItem('DateEnd')
        setDateEnd(date2)
        const place = localStorage.getItem('City')
        setCity(place)
        getListCar();
    },[])
    const getListCar = () =>{
        try {
            axios.get(`https://mighty-meadow-74982.herokuapp.com/vehicle/`)
            .then(response =>{
                const action = setList(response.data.data, response.data.data)
                dispatch(action)
            })
        } catch (error) {
            console.log(error) 
        }    
    }

    return(
        <div className="container-fluid">
            <div className="row">
                <div  className="banner">
                </div>
            </div>
            <div className="container main">
                <div className="row">
                    <div className="form-container rent-infor">
                        <p>Thuê xe / Thuê xe tự lái</p>
                        <h5>Thuê xe tự lái</h5>
                        <p style={{fontWeight:'bold', marginTop: '15px', color:'grey'}}><span style={{marginRight:'10px', fontSize: '20px'}}>Thành phố {city}</span> <span>{dateStart} đến {dateEnd} </span> </p>
                    </div>
                </div>
                <div className="row">
                <div className="col-3">
                    <Category sortPrice={sortPrice} getPriceRange={getPriceRange} />
                </div>
                <div className="col-9">
                    <h6>Tìm thấy {list.length} loại xe</h6>
                    {list.map(items=>(
                        items?<Car key={items.idVehicle} car = {items}/>: <p>Không tìm thấy xe</p>
                    ))}
                </div>
            </div>    
            </div>
        </div>
    );
}
export default CarRental