
import { Button, Card, Grid } from '@cedcommerce/ounce-ui'
import React from 'react'

const Cart = ({cart,setCart}) => {
 cart=cart.map(x=>{
    delete x['tags'];
    delete x['stock'];
    delete x['rating'];
    delete x['category'];
    return x
 })

if(cart.length>0)
  return (
<>
<Card title={'My Cart'} extraClass="myCart">
<Grid
  columns={
    [...Object.entries(cart[0]).map((x,i)=>{
        return {
            align: 'center',
            dataIndex: x[0],
            key: x[0],
            title: x[0],
            width: 100
        }
    }),{
        key: 'operation',
        render: function noRefCheck(e){ return   <Button
          content="Danger"
          type="Danger"
          onClick={()=>{
           
            setCart(cart)
          }}
        />},
        title: 'Action',
        width: 100}
       
    ]
 }
  dataSource={
    cart.map(x=>{
        
        return {
            ...x,images: <img src={x.images} alt="image" style={{height:'50px',width:'50px'}} />
        } 
    })}
/>

</Card>
</>
  )

  return <h5>No Product available in cart</h5>
}

export default Cart