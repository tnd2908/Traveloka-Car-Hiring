
import {
    Link
  } from "react-router-dom";
import { API_URL } from "../../util/util";
function Car({car}){
    const id = car.id;
    return(
        <div className="container-fluid bg-white car-item">
            <div className="row">
                <div className="col-lg-4">
                    {car.avatar?<img className="car--image" src={ API_URL + 'images/' + car.avatar} alt=""/>:
                    <p className="car-image">picture</p>}
                </div>
                <div className="col-lg-4">
                    <p className="car-name">{car.name}</p>
                </div>
                <div className="col-lg-4"> 
                    <div className="car-price">
                        <p id="car-text">Giá thuê theo ngày từ</p>
                        <p id="car-price">{new Intl.NumberFormat().format(car.self_drive_price)} VNĐ</p>
                        <Link to={`/detail/${id}`}><span>Tiếp tục</span></Link>
                    </div>
                 </div>
            </div>
        </div>
    );
}
export default Car