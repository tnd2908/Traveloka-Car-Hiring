import Dashboard from './dashboard'
import {Dropdown} from 'antd';
import { useState } from 'react';
import '../../css/admin.css'

const menu=(
    <div className="sub-menu">
        <p className="option">Đổi mật khẩu</p>
        <p className="option">Đăng xuất</p>
    </div>
);
const Admin = ({com}) =>{
    const [collapse, setCollapse] = useState(false)
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
                                    <Dropdown overlay={menu} placement="bottomRight" arrow>
                                        <p className="user-icon"><i class="fad fa-user-circle"></i></p>
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
export default Admin