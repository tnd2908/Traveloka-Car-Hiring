import Dashboard from './dashboard'
import { Dropdown } from 'antd';
import {  useState } from 'react';
import '../../css/admin.css'
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Menu = () => {
    return (
        <div className="sub-menu">
            <p className="option">Đổi mật khẩu</p>
            <p onClick={()=>{localStorage.removeItem("partner-token");window.location="/login-partner"}} className="option">Đăng xuất</p>
        </div>
    )
}
const Admin = ({ com }) => {
    const [collapse, setCollapse] = useState(false)
    const partner = useSelector(state=>state.partner.partner)
    if (localStorage.getItem("partner-token"))
        return (
            <div className="container-fluid" style={{ backgroundColor: '#eee', padding: '0' }}>
                <div className="d-flex" >
                    <div className="dashboard" >
                        <Dashboard collapse={collapse} />
                    </div>
                    <div className="main" style={{ width: '100%' }}>
                        <div className="container-fluid navbar-admin">
                            <div className="row">
                                <div className="col-9">
                                    <div className="menu-title">
                                        <button className="btn" onClick={() => setCollapse(!collapse)}><i class="fal fa-bars"></i></button>
                                        <h4>Partner</h4>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="admin-infor">
                                        <Dropdown overlay={<Menu/>} placement="bottomRight" arrow>
                                        <p className="user-icon"><i class="fad fa-user-circle"></i>Xin chào </p>
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
    else
        return <Redirect to="/login-partner" />
}
export default Admin