import React from 'react'

const BillDetail = ({bill,index}) =>{
    return(
            <tr>
              <th scope="row">{index +1}</th>
              <td>{bill.name}</td>
              <td>{bill.total}</td>
              <td>
                    <p>{bill.startDate}</p>
                    <p>{bill.endDate}</p>
              </td>
              <td>{bill.status}</td>
            </tr>
    );
}
export default BillDetail