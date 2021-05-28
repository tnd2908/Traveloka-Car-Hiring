import { Fragment, useState } from "react";
import { 
  Link
} from "react-router-dom";
import { Dropdown } from 'antd'
import LogInForm from "./login-form";

function Nav() {
  const [formVisible, setFormVisible] = useState(false)
      const onVisibleChange = () =>{
            setFormVisible(!formVisible)
      }
  return (
    <Fragment>
      <div className="container-fluid header" style={{ padding: '0' }}>
        <div className="row nav-top">
          <div className="col-3">
            <button className="btn open-left-menu"><i class="far fa-bars"></i></button>
            <Link to="/"><img className="logo" src={process.env.PUBLIC_URL + '/logo.png'} alt="" /></Link>
          </div>
          <div className="col-9">
            <div className="nav-mid">
              <Link><i class="fas fa-percent " style={{ color: 'tomato' }}></i>Khuyến mãi</Link>
              <Link to="/admin"><i class="far fa-handshake " style={{ color: 'blueviolet' }}></i>Hợp tác với chúng tôi</Link>
              <Link><i class="far fa-bookmark " style={{ color: 'darkblue' }}></i>Đã lưu</Link>
              <Link><i class="far fa-file-invoice " style={{ color: 'darkblue' }}></i>Đặt chỗ của tôi</Link>
              <div className="user">
                <Dropdown visible={formVisible} onVisibleChange={onVisibleChange} trigger="click" overlay={<LogInForm/>} overlayStyle={{ width: '300px' }} placement="bottomLeft" arrow>
                  <Link id="login"><i class="fad fa-user-circle"></i>Đăng nhập</Link>
                </Dropdown>
                <Link id="signup">Đăng ký</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="nav-bottom">
            <Link><i class="fas fa-plane prev-icon" style={{ color: 'deepskyblue' }}></i>Vé máy bay</Link>
            <Link><i class="fas fa-hotel prev-icon" style={{ color: 'indigo' }}></i>Khách sạn</Link>
            <Link><i class="fas fa-car-building prev-icon" style={{ color: 'darkcyan' }}></i>Combo tiết kiệm</Link>
            <Link><i class="fas fa-car-bus prev-icon" style={{ color: 'skyblue' }}></i>Đưa đón sân bay</Link>
            <Link><i class="fas fa-map-marked-alt prev-icon" style={{ color: 'yellowgreen' }}></i>Xperience</Link>
            <Link to={`/vehicles`} replace><i class="fas fa-car-alt prev-icon" style={{ color: 'gray' }}></i>Cho thuê xe</Link>
            <Link><i class="fas fa-globe prev-icon" style={{ color: 'tomato' }}></i>JR Pass</Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default Nav