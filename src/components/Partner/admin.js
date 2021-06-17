import Dashboard from './dashboard'
import {Dropdown} from 'antd';
import { useEffect, useState } from 'react';
import '../../css/admin.css'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { setUserInfor } from "../../action/user"
import { useDispatch, useSelector } from 'react-redux';
import { useJwt } from "react-jwt"

const Menu=()=>{
    return(
        <div className="sub-menu">
            <p className="option">Đổi mật khẩu</p>
            <p onClick={()=>{localStorage.removeItem("partner-token");window.location="/login-partner"}} className="option">Đăng xuất</p>
        </div>
    )
}
const Admin = ({com}) =>{
    const [collapse, setCollapse] = useState(false)
    const token = localStorage.getItem("partner-token");
    const { decodedToken, isExpired } = useJwt(token)
    const dispatch = useDispatch();
    const partnerInfo = useSelector(state => state.user.user)


    useEffect(() => {
        if(token) {
            axios.get("https://oka1kh.azurewebsites.net/api/profiles", {
                headers: {
                    "authorization": token
                }
            })
            .then(res => dispatch(setUserInfor(res.data.data.rolePartner[0])))
        }
    }, [token])

    useEffect(() => {
        partnerExpired();
    },[isExpired])

    const partnerExpired = () => {
        if(isExpired) {
            alert("Phiên làm việc đã hết hạn vui lòng đăng nhập lại");
            window.location="/login-partner"
        }
    } 

    if(token){
        return(
            <div className="container-fluid" style={{backgroundColor: '#eee', padding:'0'}}>
                <div className="d-flex" >
                    <div className="dashboard" >
                        <Dashboard collapse = {collapse}/>
                    </div>
                    <div className="main" style={{width:'100%'}}>
                        <div className="container-fluid navbar-admin">
                            <div className="row">
                                <div className="col-9">
                                    <div className="menu-title">
                                        <button className="btn" onClick={()=>setCollapse(!collapse)}><i class="fal fa-bars"></i></button>
                                        <h4>Admin</h4>
                                    </div>
                                </div>
                                <div className="col-3">
                                        <div className="admin-infor">
                                            <Dropdown overlay={<Menu/>} placement="bottomRight" arrow>
                                                <p className="user-icon"><i class="fad fa-user-circle"></i>Xin chào {partnerInfo?.partnerUsername}</p>
                                            </Dropdown>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div>
                            {com}
                        </div>    
                    </div>
                </div>
            </div>
        );
    }
    else{
        return(
            <Redirect to="/login-partner"/>
        )
    }
}
export default Admin