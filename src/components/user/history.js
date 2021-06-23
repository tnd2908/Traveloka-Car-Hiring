import React from 'react'
import "../../css/purchase.css"
import {Link} from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_URL } from "../../util/util"
import BillDetail from './BillDetail';
import {useDispatch, useSelector} from 'react-redux'
import { setUserInfor } from "../../action/user"


const PurchaseList = () =>{
    
    const dispatch = useDispatch()
    const user = useSelector(state=>state.user.user)
    const token = localStorage.getItem("user-token")
    const [listBill,setListBill] = useState([])
    const logout = () =>{
        localStorage.clear()
        window.location="/"
      }
    useEffect(()=>{
        // getCostumerBill()
        fetchDetail();
    },[])
    // const getCostumerBill = async ()=> {
    //     const response = await fetch('http://108.160.134.9:3301/bill/customer/2015');
    //     const data = await response.json();
    //     console.log(data)
    //     setListBill(data.result)
    // } 
    const fetchDetail = () => {
        try {
            axios.get(API_URL + `bill/customer/${user.userId}` )
                .then(response => {
                    setListBill(response.data.result)
                    console.log(response.data.result)
                    window.scrollTo(0,0)
                })
        } catch (error) {
            console.log(error)
        }
    }
    var FN = user.fristName.charAt(0)
    var LN = user.lastName.charAt(0)

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
    return(
        <div style={{margin:'30px 0'}}>    
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                    </div>
                    <div style={{margin:'10px 0',backgroundColor:'white'}} className="col-3 ">
                        <div style={{boxShadow:'0 2px 0 0 rgb(235, 230, 230)'}} className="user-navi d-flex">
                            < div className="user-in4" style={{textTransform:'uppercase'}}>
                                <h4>{FN}{LN}</h4>
                            </div>
                            <div style={{padding:'15px 20px'}} className="user-name">
                                <h5>{user.fristName} {user.lastName}</h5>
                            </div>
                        </div>    
                        <div className="coupon-user" style={{padding:'20px 10px',boxShadow:'0 2px 0 0 rgb(235, 230, 230)'}}>
                            <Link to="/" className="dark-text d-flex" ><img alt=".." src={process.env.PUBLIC_URL + 'https://d1785e74lyxkqq.cloudfront.net/godwit/lib/_/_/node_modules/@traveloka/icon-kit-web/svg/blue/ic_product_duotone_points_24px-065ef870fb5ec16205d863d2342aad24.svg'} /><h5 style={{margin:'10px 10px'}}>Điểm thưởng của tôi</h5></Link>
                            <Link to="/" className="dark-text d-flex" ><img alt=".." src={process.env.PUBLIC_URL + 'https://d1785e74lyxkqq.cloudfront.net/godwit/lib/_/_/node_modules/@traveloka/icon-kit-web/svg/blue/ic_payment_credit_card_24px-9fe4abe64401132265e82b23a523c51b.svg'} /><h5 style={{margin:'10px 10px'}}>Thẻ của tôi</h5></Link>

                        </div>
                        <div className="features-navi" style={{padding:'20px 10px',boxShadow:'0 2px 0 0 rgb(235, 230, 230)'}}>
                            <Link to="/" className="dark-text d-flex" ><i class="fad fa-clipboard-list"></i> <h5>Danh sách giao dịch</h5> </Link>
                            <Link to="/" className="dark-text d-flex" ><i class="fal fa-envelope"></i><h5>Khuyến mãi</h5> </Link>
                        </div>
                        <div className="user-manu" style={{padding:'20px 10px'}}>
                        <Link to="/" className="dark-text d-flex" ><i class="far fa-cog"></i> <h5>Tài khoản</h5> </Link>
                        <Link onClick={()=>logout()} to="/" className="dark-text d-flex" ><i class="fal fa-power-off"></i><h5>Đăng xuất</h5> </Link>
                        </div>
                    </div>
                    <div style={{margin:'30px 20px'}} className="col-5">
                        <div className="times d-flex">
                            <div style={{backgroundColor:'white'}} className="time">
                                <h6 >30 ngày qua</h6>
                            </div>
                            <div style={{backgroundColor:'white'}} className="time">
                                <h6 >Th05 2021</h6>
                            </div>
                            <div style={{backgroundColor:'white'}} className="time">
                                <h6 >Th04 2021</h6>
                            </div>
                            <div style={{backgroundColor:'white'}} className="time">
                                <h6 >Th03 2021</h6>
                            </div>
                        </div>
                        <div style={{backgroundColor:'white'}} className="purchaselist">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Stt</th>
                                    <th scope="col">Tên Xe</th>
                                    <th scope="col">Giá</th>
                                    <th scope="col">Ngày Thuê</th>
                                    <th scope="col">Tình trạng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listBill.map((items,index) =>(
                                    <BillDetail key ={items.id} bill={items} index={index}  />
                                ))}
                            </tbody>
                        </table>
                                
                            {/* <h1>{listBill.name}</h1>
                            <h2>{listBill.status}</h2> */}
                        </div>
                    </div>
                    <div className="col-2">
                    </div>
                </div>            
            </div>
        </div>    
    );
}
export default PurchaseList