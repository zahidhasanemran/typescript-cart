import CartItem from "../CartItem/CartItem";

//styles
import { CartWrapper } from "./Cart.styles";

//props
import { CartItemType } from "../../App";

//types
type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  return (
    <CartWrapper>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart. </p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCarthandler={addToCart}
          removeFromCarthandler={removeFromCart}
        />
      ))}
    </CartWrapper>
  );
};

export default Cart;
