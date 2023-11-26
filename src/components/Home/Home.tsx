import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../types";
import { Box, CardActionArea, CardContent, Grid, Stack, Tooltip, Typography, CardMedia, CardActions, IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";

export default function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const env = import.meta.env;

  const handleAddToCart = (event: React.MouseEvent) => {
    event.stopPropagation();
    // Add your logic for adding to cart
  };

  const handleViewChart = (event: React.MouseEvent) => {
    event.stopPropagation();
    // Add your logic for viewing the chart
  };

  const handelNavAndRedux = (productId: string) => {
    productId && navigate(`/product/${productId}`);
  };

  const getProducts = async () => {
    try {
      const productsResult = await axios.get(`${env.VITE_BASE_URL}/api/products/`);
      setProducts(productsResult.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {products !== null ? (
        <Box width="100%" my={4} display="flex" alignItems="center" flexWrap="wrap" gap={4}>
          <div style={{ padding: "6rem 8rem 10rem 8rem" }}>
            <Grid container spacing={3}>
              {Array.isArray(products) &&
                products.map((product, index) => (
                  <Grid item sm={8} md={4} lg={2} p={3} key={index} border="2px solid #5896" margin="13px" borderRadius="33px">
                    <CardActionArea
                      onClick={() => {
                        handelNavAndRedux(product._id);
                      }}>
                      <div style={{ position: "relative" }}>
                        <CardMedia component="img" image={product.image.medium} alt={product.image.alt} />
                      </div>

                      <CardContent sx={{ p: 5, pt: 2 }}>
                        <Typography variant="h5">{product.name}</Typography>
                        <Typography variant="h6">quantity:{product.quantity}</Typography>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1}>
                          <Stack direction="column" alignItems="center">
                            {product.discountPercentage && (
                              <Typography color="textSecondary" ml={1} sx={{ textDecoration: "line-through" }}>
                                before discount: ${product.salePrice}
                              </Typography>
                            )}
                            {product.discountPercentage && (
                              <Typography variant="h6">
                                after discount: ${product.salePrice - product.salePrice * (product.discountPercentage / 100)}
                              </Typography>
                            )}
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
                              background: "#3f51b5",
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
                            onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleViewChart(event)}
                            size="small"
                            color="primary"
                            sx={{
                              bottom: "15px",
                              right: "60px",
                              position: "absolute",
                              background: "#3f51b5",
                              color: "white",
                              "&:hover": {
                                background: "green",
                              },
                            }}>
                            <BarChartIcon />
                          </IconButton>
                        </Tooltip>
                      </CardActions>
                    </CardActionArea>
                  </Grid>
                ))}
            </Grid>
          </div>
        </Box>
      ) : (
        <Box width="100%" my={4} display="flex" alignItems="center" gap={4}></Box>
      )}
    </>
  );
}
