import { IProductCardProps } from "../../types";
import { Card, CardContent, CardMedia, Typography, Chip } from "@mui/material";
import { FC } from "react";

const ProductCard: FC<IProductCardProps> = ({ product }) => {
  const { image, name, description, salePrice, quantity, category, discountPercentage } = product;
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
        <Chip label={`Quantity: ${quantity}`} />
        <Chip label={`Category: ${category}`} />
        <Chip label={`Discount Percentage: ${discountPercentage}`} />
      </CardContent>
    </Card>
  );
};

export default ProductCard;
