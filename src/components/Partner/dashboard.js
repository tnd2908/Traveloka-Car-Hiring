import '../../css/admin.css'
import { Menu } from 'antd';
import {
  AppstoreAddOutlined,
  DesktopOutlined,
  ContainerOutlined,
  EyeOutlined,
  PlusOutlined,
  CarOutlined,
} from '@ant-design/icons';
import {Link} from 'react-router-dom'
import { API_URL } from '../../util/util';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import { setPartnerInfor } from '../../action/partner';

const { SubMenu } = Menu;

const Dashboard = ({collapse}) =>{
  const dispatch = useDispatch()
  const header = {
    'Authorization' : 'Bearer ' + localStorage.getItem("partner-token")
}
  useEffect(()=>{
    try {
        axios.get(API_URL + "user/token", {
            headers: header
        })
        .then(res=>{
            const action = setPartnerInfor(res.data.result)
            dispatch(action)
        })
    } catch (error) {
        console.log(error)
    }
},[])
    return(
        <Menu
          defaultSelectedKeys={'1'}
          defaultOpenKeys={'car'}
          mode="inline"
          theme="dark"
          inlineCollapsed = {collapse}
          collapsedWidth = "400px"
          style={{height: '100%', minHeight:'100vh'}}
        >
          <Menu.Item key="0" className="bg-dark" disabled style={{cursor:'default', padding:'0 20px', margin:'0'}}>
              <h5 style={{margin:'0', height:'100%'}} className="text-light d-flex align-items-center">Dashboard</h5>
          </Menu.Item>
          <Menu.Item key="1" icon={<DesktopOutlined  />}>
            <Link to="/partner">Trang chủ</Link>
          </Menu.Item>
          <SubMenu className="submenu" key="car" icon={<CarOutlined />} title="Quản lý xe">
            <Menu.Item key="5" icon={<EyeOutlined />}> <Link to="/partner/vehicles"> Xem danh sách xe</Link></Menu.Item>
            <Menu.Item key="6" icon={<PlusOutlined/>}><Link to="/partner/add-vehicles"> Thêm xe mới</Link></Menu.Item>
            <Menu.Item key="7" icon={<AppstoreAddOutlined/>}><Link to="/partner/add-car-area"> Thêm xe vào khu vực</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<ContainerOutlined />} title="Quản lý đơn hàng">
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
          </SubMenu>
        </Menu>
    );
}
export default Dashboard