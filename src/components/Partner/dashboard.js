import '../../css/admin.css'
import { Menu } from 'antd';
import {
  AppstoreAddOutlined,
  DesktopOutlined,
  ContainerOutlined,
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
  CarOutlined,
} from '@ant-design/icons';
import {Link} from 'react-router-dom'
const { SubMenu } = Menu;

const Dashboard = ({collapse}) =>{
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
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <Menu.Item key="3" icon={<ContainerOutlined />}>
            Option 3
          </Menu.Item>
          <SubMenu className="submenu" key="car" icon={<CarOutlined />} title="Quản lý xe">
            <Menu.Item key="5" icon={<EyeOutlined />}> <Link to="/partner/vehicles"> Xem danh sách xe</Link></Menu.Item>
            <Menu.Item key="6" icon={<AppstoreAddOutlined/>}><Link to="/partner/add-vehicles"> Thêm xe mới</Link></Menu.Item>
            <Menu.Item key="7" icon={<AppstoreAddOutlined/>}><Link to="/partner/add-car-area"> Thêm xe vào khu vực</Link></Menu.Item>
            <Menu.Item key="8" icon={<DeleteOutlined />}>Xoá xe</Menu.Item>
            <Menu.Item key="9" icon={<EditOutlined />}>Cập nhật thông tin xe</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<ContainerOutlined />} title="Quản lý đơn hàng">
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
          </SubMenu>
        </Menu>
    );
}
export default Dashboard