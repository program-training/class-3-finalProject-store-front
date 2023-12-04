import { IProductCardProps } from "../../types";
import { FC } from "react";
import { MouseEvent } from "react";
import { Card, CardContent, Tooltip, Typography, CardMedia, CardActions, IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";

const ProductCard: FC<IProductCardProps> = ({ product }) => {
  const { image, name, description, salePrice, quantity, category, discountPercentage } = product;
  return (
    <Card sx={{ display: `flex`, flexDirection: `row` }}>
      <CardMedia component="img" image={image.large} alt={image.alt} sx={{ maxHeight: `700px`, maxWidth: `500px`, padding: `0 50px`}} />
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
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ textDecoration: `line-through`, padding: `0 10px 0 10px`, color: `#fd384f`, fontSize: `17px` }}>
            ${salePrice}
          </Typography>
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {discountPercentage}% Off
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ marginTop: `80px` }}>
          {quantity} Pieces available
        </Typography>
        <CardActions>
          <Tooltip title="Add To Cart">
            <IconButton 
              onClick={(event: MouseEvent<HTMLButtonElement>) => event}
              size="small"
              color="primary"
              sx={{
                bottom: "15px",
                right: "15px",
                position: "absolute",
                background: "#3F51B5",
                color: "white",
                "&:hover": {
                  background: "green",
                },
              }}>
              <AddShoppingCartIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="View Chart">
            <IconButton
              onClick={(event: MouseEvent<HTMLButtonElement>) => event}
              size="small"
              color="primary"
              sx={{
                bottom: "15px",
                right: "60px",
                position: "absolute",
                background: "#3F51B5",
                color: "white",
                "&:hover": {
                  background: "green",
                },
              }}>
              <BarChartIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
