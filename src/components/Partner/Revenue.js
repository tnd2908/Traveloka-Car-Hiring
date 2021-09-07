import { Divider, Spin } from "antd";
import Bar from "./KPI";
import Donut from "./SaledCar"
import { setList } from '../../action/car'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_URL, DEV_URL } from "../../util/util";
import { Fragment } from "react";

const Revenue = (props) => {
    const partnerInfo = useSelector(state => state.user.user),
    [listCar, setListCar] = useState([]),
    [monthRevenue, setMonthRevenue] = useState([]),
    [isLoading, setIsLoading] = useState(false),
    dispatch = useDispatch();

    useEffect(() => {
        if(partnerInfo.partnerId) {
            setIsLoading(true)
            axios.get(API_URL + "car/saler?id=" + partnerInfo.partnerId)
            .then(response => {
                const filter = response.data.result.sort((a,b)=>b.saled - a.saled).slice(0,5)
                setListCar(filter);
                const action = setList(response.data.result, response.data.result)
                dispatch(action)
                setIsLoading(false)
            })
        }
    },[partnerInfo.partnerId])

    useEffect(() => {
        if(partnerInfo.partnerId) {
                axios.get(API_URL + `bill/KPI/${partnerInfo.partnerId}?year=${new Date().getFullYear()}`)
                .then(res => {
                console.log(res);
                setMonthRevenue(res.data.result)
            })
        }
    },[partnerInfo.partnerId])

    return (
        <div className="container p-2">
            {
                !isLoading ? <Fragment>
                    
                    <div className="row mt-5 pt-5">
                        <div className="col-8 bg-white">
                        <Bar 
                        data={monthRevenue}
                        options={{
                            maintainAspectratio: false
                        }}
                    />
                        </div>
                        <div className="col-4 bg-white">
                        <Donut data={listCar}/>
                        </div>
                    </div>
                    <Divider/>

                </Fragment> : <Spin size="large"/>
            }    
        </div>
    )
}

export default Revenue