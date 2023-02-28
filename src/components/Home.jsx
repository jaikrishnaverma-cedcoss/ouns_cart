import { ButtonDropdown, Topbar } from "@cedcommerce/ounce-ui";
import React from "react";
import { useState } from "react";
import Body from "./Body";
import Cart from "./Cart";
import { filteredData } from "./database";

const Home = () => {
  const data = filteredData();
  const [state, setState] = useState({ navigate: true ,cart:[]});
  const connectLeft = () => {
    return (
      <div className="logo" style={{ fontWeight: "900", fontSize: "30px" }} onClick={()=>setState({...state,navigate:true})}>
        <img
          src="logo192.png"
          width="50px"
          alt="productpage"
          style={{ marginRight: "10px" }}
        />
        World
      </div>
    );
  };
  const connectRight = () => {
    return (
      <>
        <ButtonDropdown
          content=""
          halign="Equal"
          icon={<i className="bi bi-person-circle"></i>}
          iconAlign="left"
          list={[
            {
              icon: <i width="20px" className="bi bi-cart-fill"></i>,
              label: "My Cart",
              onClick: ()=>setState({...state,navigate:false}),
            },
            {
              icon: (
                <svg
                  className="css-i6dzq1"
                  fill="none"
                  height="20"
                  stroke="#8F8F8F"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="20"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" x2="9" y1="12" y2="12" />
                </svg>
              ),
              label: "Item 2",
              onClick: function noRefCheck() {},
            },
            {
              icon: (
                <svg
                  className="feather feather-chevron-down"
                  fill="none"
                  height="24"
                  stroke="#0A0A0A"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              ),
              label: "Item 3",
              onClick: function noRefCheck() {},
            },
          ]}
          onAction={function noRefCheck() {}}
          onClick={function noRefCheck() {}}
          popoverContainer="body"
          thickness="thin"
          title="Profile"
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
        {state.navigate ? <Body cart={state.cart} setCart={(cart)=>setState({...state,cart:[...cart]})}/>
         : <Cart cart={state.cart} setCart={(cart)=>setState({...state,cart:[...cart]})}/>}
        </main>
      <footer></footer>
    </>
  );
};

export default Home;
