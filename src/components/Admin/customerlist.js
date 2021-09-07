import React, { useState, useEffect } from 'react'
import {Form} from 'antd'
import { API_URL } from '../../util/util';
import CustomerDetail from './customer'



const Costumer =()=>{

    const [customerlist,setCostumerlist] = useState([])

    const getCostumer = async ()=> {
        const response = await fetch('https://oka1kh.azurewebsites.net/api/users');
        const data = await response.json();
        console.log(data)
        setCostumerlist(data.Users.Users)
    } 

    useEffect(() => {
        try{
                getCostumer();
        }
        catch (error) {
            console.log(error)
        }
    }, [])

    return(
        <div style={{margin:'100px 70px'}}>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Stt</th>
                        <th scope="col">Tên Xe</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Ngày Thuê</th>
                        <th scope="col"></th>
                    </tr>
                </thead>     
                <tbody>
                    {customerlist.map((user, index) =>(
                        <CustomerDetail customer={user} index = {index}/>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default Costumer