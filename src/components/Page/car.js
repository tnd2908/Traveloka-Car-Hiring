import axios from "axios";
import { useEffect } from "react";
import {
    Link
  } from "react-router-dom";
function Car({car}){
    const id = car.idVehicle;
    const fetchCar = () => {
        axios.get("https://mighty-meadow-74982.herokuapp.com/vehicle/"+id)
        .then(res=>{
            console.log(res);
        })
    }
    useEffect(()=>{

    },[])
    return(
        <div className="container-fluid bg-white car">
            <div className="row">
                <div className="col-3">
                    <p className="image">picture</p>
                </div>
                <div className="col-5">
                    <p className="name">{car.name}</p>
                </div>
                <div className="col-4"> 
                    <div className="price">
                        <p id="text">Giá thuê theo ngày từ</p>
                        <p id="price">{new Intl.NumberFormat().format(car.price)} VNĐ</p>
                        <Link to={`/vehicles/${id}`}><span>Tiếp tục</span></Link>
                    </div>
                 </div>
            </div>
        </div>
    );
}
export default Car