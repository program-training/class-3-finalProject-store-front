import { IProduct } from "../../types";
import { Card, CardContent, CardMedia, Typography, Chip } from "@mui/material";
import { FC } from "react";

interface IProductCardProps {
  product: IProduct;
}

const ProductCard: FC<IProductCardProps> = ({ product }) => {
  const { image, name, description, salePrice, quantity, category, discountPercentage } = product;
  return (
    <Card sx={{ display: `flex`, flexDirection: `row` }}>
      <CardMedia component="img" image={image.large} alt={image.alt} sx={{ maxHeight: `700px`, maxWidth: `500px`, padding: `0 50px` }} />
      <CardContent sx={{ width: `700px`, display: `flex`, flexDirection: `column`, padding: `80px 30px 0 30px` }}>
        <Typography gutterBottom variant="h3" component="div" sx={{ width: `100%`, margin: `0` }}>
          {name}
        </Typography>
        <Typography variant="h5" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {category}
        </Typography>
        <Typography gutterBottom component="div" sx={{ display: `flex`, margin: `50px 0 0 0` }}>
          <Typography variant="h6" sx={{ fontSize: `30px` }}>
            ${(salePrice * ((100 - discountPercentage) / 100)).toFixed(2)}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{textDecoration: `line-through`, padding: `0 10px 0 10px`, color: `#fd384f`, fontSize: `17px`}}>
            ${salePrice}
          </Typography>
        </Typography>
          <Typography variant="h6" color="text.secondary">
            {discountPercentage}% Off
          </Typography>
        <Chip label={`Quantity: ${quantity}`} />
      </CardContent>
    </Card>
  );
};

export default ProductCard;
