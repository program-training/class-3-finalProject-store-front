import { useState, useEffect } from "react";
import { CardActionArea, IconButton, Typography, CardMedia, CardContent, Card, Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { CartItem } from "../../helpers/types";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";

const CartItems = () => {
  const [products, setProducts] = useState<CartItem[]>();
  const productCart = useAppSelector((state: RootState) => state.userCart.cart.productsCart);

  useEffect(() => {
    setProducts(productCart);
  }, []);

  const onclickPayNow = () => {};

  const addQuantity = () => {};
  const reduceQuantity = () => {};
  const removeFromCart = () => {};
  return (
    <div className="product-cart">
      <h1>Shopping Cart</h1>
      <div className="products-list">
        {products?.map((cartProduct) => (
          <Card key={cartProduct.product._id} sx={{ maxWidth: 232 }}>
            <CardActionArea>
              <CardMedia component="img" height="140" image={cartProduct.product.image.small} alt={cartProduct.product.image.alt} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {cartProduct.product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {cartProduct.product.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {cartProduct.product.salePrice}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <IconButton onClick={() => addQuantity()}>
                    <AddCircleOutlineIcon />
                  </IconButton>
                  {cartProduct.product.quantity}
                  <IconButton onClick={() => reduceQuantity()}>
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                  <IconButton onClick={() => removeFromCart()}>
                    <DeleteForeverIcon />
                  </IconButton>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
      <Button variant="contained" color="primary" onClick={onclickPayNow}>
        Pay Now{" "}
      </Button>
    </div>
  );
};
export default CartItems;
