import React from 'react'

const CustomerDetail =({customer,index})=>{
    return(
        <tr>
            <th scope="row">{index +1}</th>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>____</td>
        </tr>
    );
}

export default CustomerDetail