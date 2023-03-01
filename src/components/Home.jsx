import { Button, ButtonDropdown, Topbar } from "@cedcommerce/ounce-ui";
import React from "react";
import { useState } from "react";
import Body from "./Body";
import Cart from "./Cart";
import useIndex from "./customHook/useIndex";
import { filteredData } from "./database";

const Home = () => {
  const data = filteredData();
  const [state, setState] = useState({ navigate: true ,cart:[]});
  const getIndex=useIndex()

  // handle cart and manage cart products with rspect to stocks also manage cart quantity incr/decr 
  const cartHandler=(prod , type='inc')=>{
    let index = getIndex(data , 'id' , prod.id)
    let indexInCart = state.cart.findIndex(
      (item) => item.id == prod.id
    );
    if (indexInCart == -1) {
      state.cart.push({...prod,
        quantity: 1,
        total: prod.price,
      });
    } else if (
      !(
        (type === "inc" &&
          state.cart[indexInCart].quantity + 1 > data[index].stock) ||
        (type === "dec" && state.cart[indexInCart].quantity - 1 < 0)
      )
    ) {
      state.cart[indexInCart].quantity =
        type == "inc"
          ? state.cart[indexInCart].quantity + 1
          : state.cart[indexInCart].quantity - 1;
      state.cart[indexInCart].total =
        state.cart[indexInCart].price * state.cart[indexInCart].quantity;
    }
    state.cart.forEach((item,i)=>{
       if(item.quantity==0)
       state.cart.splice(i,1)
    })
  
    setState({...state,cart:[...state.cart]});
  }
  // navbar left div jsx
  const connectLeft = () => {
    return (
      <div className="logo" style={{ fontWeight: "900", fontSize: "30px" }} onClick={()=>setState({...state,navigate:true})}>
        <img
          src="logo192.png"
          width="50px"
          alt="productpage"
          style={{ marginRight: "10px" }}
        />
        Shop
      </div>
    );
  };
    // navbar right div jsx
  const connectRight = () => {
    return (
      <>
          <Button
    content={<><i width="20px" className="bi bi-cart-fill"> {state.cart.length}</i></>}
    halign="Equal"
    iconAlign="left"
    length="none"
    onAction={function noRefCheck(){}}
    onClick={()=>setState({...state,navigate:false})}
    tabIndex="1"
    thickness="thin"
    type="Primary"
  />
      </>
    );
  };
  return (
    <>
      <header>
        <Topbar connectLeft={connectLeft()} connectRight={connectRight()} />
      </header>
      <main style={{paddingTop:'70px'}}>
        {state.navigate ? <Body cart={state.cart} cartHandler={(cart)=>cartHandler(cart)}/>
         : <Cart cart={state.cart}  setCart={(cart)=>setState({...state,cart:[...cart]})} cartHandler={cartHandler}/>}
        </main>
      <footer></footer>
    </>
  );
};

export default Home;
