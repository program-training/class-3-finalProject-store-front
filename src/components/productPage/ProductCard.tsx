import { IProduct } from "../../types";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { FC } from "react";

interface IProductCardProps {
  product: IProduct;
}

const ProductCard: FC<IProductCardProps> = ({ product }) => {
  const { image, name, description, salePrice } = product;
  return (
    <Card>
      <CardMedia component="img" image={image.large} alt={image.alt} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {salePrice} ₪
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
