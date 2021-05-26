import { Fragment, useState } from "react";
import { 
  Link
} from "react-router-dom";
import { Dropdown } from 'antd'
import LogInForm from "./login-form";
const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
// const loginForm = () => {
//   const dispatch = useDispatch()
//   const loginPartner = (partner) =>{
//     const action = loginPartner(partner)
//     dispatch(action)
//   }
//   return (
//         <Form
//               {...layout}
//               name="basic"
//               colon={false}
//               initialValues={{ remember: true }}
//               style={{padding: '12px', paddingTop:'20px'}}
//               onFinish={loginPartner}
//               className="login-form"
//         >
//               <h6 style={{fontWeight:'bold', marginBottom:'10px'}}>Đăng nhập tài khoản</h6>
//               <Form.Item
//                     name="email"
//                     style={{fontWeight:'bold', color:'grey', marginBottom:'10px'}}
//                     rules={[{ required: true, message: 'Vui lòng nhập địa chỉ email' }]}
//               >
//                     <label htmlFor="email">Email</label>
//                     <Input size="large" name="email" />
//               </Form.Item>
//               <Form.Item
//                     name="password"
//                     style={{fontWeight:'bold', color:'grey'}}
//                     rules={[{ required: true, message: 'Vui lòng nhập password' }]}
//               >
//                     <label htmlFor="password">Password</label>
//                     <Input.Password name="password" size="large"/>
//               </Form.Item>
//               <Form.Item>
//                     <div className="d-flex">
//                           <button type="submit" className="login-btn">Đăng nhập</button>
//                           <div className="signup-link">
//                                 <p>Bạn chưa có tài khoản?</p>
//                                 <Link>Đăng ký ngay</Link>
//                           </div>
//                     </div>
//               </Form.Item>
//         </Form>
//   );
// }
function Nav() {
  const [formVisible, setFormVisible] = useState(false)
  const [haha,setHaha] = useState('')
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
            <Link to="vehicles"><i class="fas fa-car-alt prev-icon" style={{ color: 'gray' }}></i>Cho thuê xe</Link>
            <Link><i class="fas fa-globe prev-icon" style={{ color: 'tomato' }}></i>JR Pass</Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default Nav