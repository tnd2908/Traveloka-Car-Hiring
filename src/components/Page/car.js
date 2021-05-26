
import {
    Link
  } from "react-router-dom";
function Car({car}){
    const id = car.idVehicle;
    return(
        <div className="container-fluid bg-white car-item">
            <div className="row">
                <div className="col-md-3">
                    <p className="car-image">picture</p>
                </div>
                <div className="col-md-5">
                    <p className="car-name">{car.name}</p>
                </div>
                <div className="col-md-4"> 
                    <div className="car-price">
                        <p id="car-text">Giá thuê theo ngày từ</p>
                        <p id="car-price">{new Intl.NumberFormat().format(car.price)} VNĐ</p>
                        <Link to={`/detail/${id}`}><span>Tiếp tục</span></Link>
                    </div>
                 </div>
            </div>
        </div>
    );
}
export default Car