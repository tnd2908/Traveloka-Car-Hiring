const { Menu } = require("antd");
const { Link, useParams } = require("react-router-dom");
const { SubMenu } = Menu;

const Dashboard = (props) => {
    const { idVehicle } = useParams();
    return (
        <Menu
            style={{ width: 256, minHeight:'100vh' }}
            mode="inline"
            theme="dark"
        >
            <div className="menu-ant-title"><h5>Traveloka Pay</h5></div>
            <Menu.Item key="1">Thẻ tín dụng</Menu.Item>
            <Menu.Item key="2"> Chuyển khoảng ngân hàng</Menu.Item>
            <Menu.Item key="3"><Link to={`/vehicles/${idVehicle}/payment`} replace></Link>Tại cửa hàng</Menu.Item>
            <Menu.Item key="4"><Link to={`/vehicles/${idVehicle}/payment/credit`}></Link>Thẻ visa</Menu.Item>
        </Menu>
    );
}
export default Dashboard