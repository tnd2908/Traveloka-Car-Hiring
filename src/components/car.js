import {
    Link
  } from "react-router-dom";
function Car({car}){
    const id = car.idVehicle;
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
                        <p id="price">$ {car.price}</p>
                        <p> {car.idCategory}</p>
                        <Link to={id}><span>Tiếp tục</span></Link>
                    </div>
                 </div>
            </div>
        </div>
    );
}
export default Car