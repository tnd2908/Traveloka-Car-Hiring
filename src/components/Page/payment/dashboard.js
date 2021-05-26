const { Menu } = require("antd");
const { SubMenu } = Menu;

const Dashboard = () => {
    return (
        <Menu
            style={{ width: 256, minHeight:'100vh' }}
            mode="inline"
            theme="dark"
        >
            <div className="menu-ant-title"><h5>Traveloka Pay</h5></div>
            <Menu.Item key="1">Thẻ tín dụng</Menu.Item>
            <Menu.Item key="2"> Chuyển khoảng ngân hàng</Menu.Item>
            <Menu.Item key="3">Tại cửa hàng</Menu.Item>
            <Menu.Item key="4">Thẻ atm nội địa</Menu.Item>
        </Menu>
    );
}
export default Dashboard