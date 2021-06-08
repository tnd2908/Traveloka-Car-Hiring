import { Fragment, useEffect, useState } from "react";
import { 
  Link
} from "react-router-dom";
import { Dropdown } from 'antd'
import LogInForm from "./login-form";
import axios from "axios";
import { API_URL } from "../../util/util";
import {useDispatch, useSelector} from 'react-redux'
import { setUserInfor } from "../../action/user";
const logout = () =>{
  localStorage.clear()
  window.location="/"
}
const UserButton = () =>{
  return(
    <div className="bg-white d-flex flex-column user-form">
        <Link className="text-dark" to="/"><i class="fal fa-user"></i>Thông tin cá nhân</Link>
        <Link className="text-dark" to="/" onClick={()=>logout()}><i class="fal fa-sign-out"></i>Đăng xuất</Link>
    </div>
  )
}
function Nav() {
  const [formVisible, setFormVisible] = useState(false)
  const onVisibleChange = () =>{
      setFormVisible(!formVisible)
  }
  const dispatch = useDispatch()
  const user = useSelector(state=>state.user.user)
  const token = localStorage.getItem("user-token")
  useEffect(()=>{
    if(token){
      try {
        const header = {'Authorization': token}
          axios.get( 'https://oka1kh.azurewebsites.net/api/profiles', {
                headers: header
            })
          .then(res=>{
            console.log(res.data.data.auth[0])
            const action = setUserInfor(res.data.data.auth[0])
            dispatch(action)
          })
      } catch (error) {
        console.log(error)
      }
    }
  },[token])
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
              <Link to="/partner"><i class="far fa-handshake " style={{ color: 'blueviolet' }}></i>Hợp tác với chúng tôi</Link>
              <Link><i class="far fa-bookmark " style={{ color: 'darkblue' }}></i>Đã lưu</Link>
              <Link><i class="far fa-file-invoice " style={{ color: 'darkblue' }}></i>Đặt chỗ của tôi</Link>
              {!token?<div className="user">
                <Dropdown visible={formVisible} onVisibleChange={onVisibleChange} trigger="click" overlay={<LogInForm/>} overlayStyle={{ width: '300px' }} placement="bottomLeft" arrow>
                  <Link id="login"><i class="fad fa-user-circle"></i>Đăng nhập</Link>
                </Dropdown>
                <Link id="signup">Đăng ký</Link>
              </div>
               :<div className="user">
                 <Dropdown 
                    visible={formVisible} 
                    onVisibleChange={onVisibleChange} 
                    trigger="click"  
                    overlay={<UserButton/>}
                    placement="bottomRight" arrow>
                    <Link id="login">Xin chào <span style={{textTransform:'uppercase', fontWeight:'bold', color:'blue'}}> {user.fristName} </span></Link>
                 </Dropdown>
              </div>}
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