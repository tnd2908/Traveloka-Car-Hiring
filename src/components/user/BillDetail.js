import React from 'react'
import {Tag} from 'antd'

const BillDetail = ({bill,index}) =>{
    return(
            <tr style={{margin:'1px 0'}}>
              <th scope="row">{index +1}</th>
              <td>{bill.name}</td>
              <td>{bill.total}</td>
              <td>
                    <p>{bill.startDate}</p>
                    <p>{bill.endDate}</p>
              </td>
              <td><Tag color="red">{bill.status}</Tag></td>
            </tr>
    );
}
export default BillDetail