import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../types";
import { Card, Box, CardActionArea, CardContent, Stack, Tooltip, Typography, CardMedia, CardActions, IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import ProductsSkelton from "./ProductsSkelton";
import { RootState } from "../../redux/store";
import { useAppSelector } from "../../redux/hooks";

export default function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const env = import.meta.env;
  const search = useAppSelector((state: RootState) => state.search.name);
  console.log(search);

  const componentsArr: React.ReactNode[] = [];
  for (let i = 0; i <= 6; i++) {
    componentsArr.push(<ProductsSkelton key={i} />);
  }
  const handleAddToCart = (event: React.MouseEvent) => {
    event.stopPropagation();
  };
  const handleViewChart = (event: React.MouseEvent) => {
    event.stopPropagation();
  };
  const handelNavAndRedux = (productId: string) => {
    productId && navigate(`/product/${productId}`);
  };
  const getProducts = async (search: string = "") => {
    try {
      const productsResult = await axios.get(`${env.VITE_BASE_URL}/api/products/${search}`);
      setProducts(productsResult.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    getProducts(search);
  }, [search]);
  return (
    <>
      {products !== null ? (
        <Card sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {Array.isArray(products) &&
            products.map((product) => (
              <CardActionArea
                sx={{ maxWidth: 345, flex: "1 1 300px", margin: "1rem" }}
                onClick={() => {
                  handelNavAndRedux(product._id);
                }}
              >
                <CardMedia component="img" image={product.image.medium} alt={product.image.alt} />
                <CardContent sx={{ p: 5, pt: 2 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    quantity:{product.quantity}
                  </Typography>
                  <Stack>
                    <Stack direction="row" alignItems="center">
                      {product.discountPercentage && (
                        <Typography color="textSecondary" ml={1} sx={{ textDecoration: "line-through" }}>
                          before discount: ${product.salePrice}
                        </Typography>
                      )}
                      {product.discountPercentage && <Typography variant="h6">after discount: ${(product.salePrice - product.salePrice * (product.discountPercentage / 100)).toFixed(2)}</Typography>}
                    </Stack>
                  </Stack>
                </CardContent>
                <CardActions>
                  <Tooltip title="Add To Cart">
                    <IconButton
                      onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleAddToCart(event)}
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
                      }}
                    >
                      <AddShoppingCartIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="View Chart">
                    <IconButton
                      onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleViewChart(event)}
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
                      }}
                    >
                      <BarChartIcon />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </CardActionArea>
            ))}
        </Card>
      ) : (
        <Box width="100%" my={4} display="flex" alignItems="center" gap={4}>
          {componentsArr}
        </Box>
      )}
    </>
  );
}
