import React, { useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
const CarDetail = () =>{
    let {idVehicle} = useParams();
    useEffect(()=>{
        fetchDetail();
    },[])
    const fetchDetail = () =>{
        try {
            axios.get(`https://mighty-meadow-74982.herokuapp.com/vehicle/`)
            .then(response=>{
                console.log(response)
            })
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <div className="container-fluid">
            <div className="row">
                <divv className="col-9">
                <p>helo id is {idVehicle} </p>
                </divv>
                <div className="col-3">

                </div>
            </div>
        </div>
    );
}
export default CarDetail