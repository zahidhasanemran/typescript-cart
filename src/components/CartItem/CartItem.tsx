import { Button } from "@material-ui/core";
import { CartItemType } from "../../App";
import { CartItemWrapper } from "./CartItem.styles";

// type
type CartItemProp = {
  item: CartItemType;
  addToCarthandler: (clickedItem: CartItemType) => void;
  removeFromCarthandler: (id: number) => void;
};

const CartItem: React.FC<CartItemProp> = ({
  item,
  addToCarthandler,
  removeFromCarthandler,
}) => {
  return (
    <CartItemWrapper>
      <div>
        <h3>{item.title}</h3>
        <div className="information">
          <p>Price: $ ${item.price}</p>
          <p>Total: $ {(item.amount * item.price).toFixed(2)}</p>
        </div>
        <div className="buttons">
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => removeFromCarthandler(item.id)}
          >
            -
          </Button>
          <p>{item.amount}</p>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => addToCarthandler(item)}
          >
            +{" "}
          </Button>
        </div>
      </div>
      <img src={item.image} alt={item.title} />
    </CartItemWrapper>
  );
};

export default CartItem;
