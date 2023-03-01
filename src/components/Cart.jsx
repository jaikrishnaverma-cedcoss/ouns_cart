import { Button, Card, Grid } from "@cedcommerce/ounce-ui";
import React from "react";
import useIndex from "./customHook/useIndex";

const Cart = ({ cart, setCart, cartHandler }) => {
  // using customhook for getting index of requred array objeact behalf of keys values match
  // this getIndex takes 3 paremeter ( array , key(string) , value)
  const getIndex = useIndex();
  cart = cart.map((x) => {
    delete x["tags"];
    delete x["stock"];
    delete x["rating"];
    delete x["category"];
    delete x["discountPercentage"];
    delete x["description"];
    return x;
  });

  if (cart.length > 0)
    return (
      <>
        <Card title={"My Cart"} extraClass="myCart">
          <Grid
          scrollX
            columns={[
              ...Object.entries(cart[0]).map((x, i) => {
                  return {
                    align: "center",
                    dataIndex: x[0],
                    key: x[0],
                    title: x[0].toUpperCase(),
                    width: 100,
                  };
              }),
              {
                key: "operation",
                render: function noRefCheck(obj) {
                  return (
                    <Button
                      content={<i className="bi bi-trash-fill"></i>}
                      type="Danger"
                      onClick={() => {
                        let index = getIndex(cart, "id", obj.id);
                        console.log(index);
                        if (index !== -1) cart.splice(index, 1);
                        setCart(cart);
                      }}
                    />
                  );
                },
                title: "ACTION",
                width: 100,
              }
            ]}
            dataSource={cart.map((x) => {
              return {
                ...x,
                images: (
                  <img
                    src={x.images}
                    alt="image"
                    style={{ height: "70px", width: "70px" }}
                  />
                ),
                quantity:(
                  <div className="incrdecr">
                  <i className="bi bi-dash-circle-fill" onClick={()=>cartHandler(x,'dec')}></i>
                  <span>{x.quantity}</span>
                  <i className="bi bi-plus-circle-fill"  onClick={()=>cartHandler(x,'inc')}></i>
                </div> 
                )
              };
            })}
          />
        </Card>
      </>
    );
// in case if no products in cart
  return <Card
  alt="Natutre"
  cardType=""
  media="cart1.png"
  title=""
>
</Card>;
};

export default Cart;
