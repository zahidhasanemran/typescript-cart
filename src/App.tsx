import { Badge, Drawer, Grid, LinearProgress } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { isTemplateSpan } from "typescript";
import { Wrapper, StyledButton } from "./App.styles";
import Cart from "./components/Cart/Cart";
import Item from "./components/Item/Item";

//types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItemType[]> => {
  let res = await fetch("https://fakestoreapi.com/products");
  return res.json();
};

// const getProducts = async (): Promise<CartItemType[]> => {
//   const res = await axios
//     .get<CartItemType[]>(`https://fakestoreapi.com/products`)
//     .then((response) => {
//       console.log(response.data);
//     });
//   return res.data.json();
// };

function App() {
  const { data, isLoading, error } = useQuery<CartItemType[], Error>(
    "all-products",
    getProducts
  );

  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((acc: number, item) => acc + item.amount, 0);

  const AddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      // 1. is the item already added in cart ?
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);
      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // first time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const RemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc;
          return [...acc, { ...item, amount: item.amount - 1 }];
        } else {
          return [...acc, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading) {
    return <LinearProgress />;
  }
  if (error) {
    return <div>Something went wrong</div>;
  }

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={AddToCart}
          removeFromCart={RemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)}>
          <AddShoppingCart />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((sm) => (
          <Grid item key={sm.id} xs={12} sm={4}>
            <Item item={sm} handleAddToCart={AddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
