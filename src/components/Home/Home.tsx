import { MouseEvent, ReactNode, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../types";
import { Card, Box, CardActionArea, CardContent, Stack, Tooltip, Typography, CardMedia, CardActions, IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import ProductsSkelton from "./ProductsSkelton";
import { RootState } from "../../redux/store";
import { useAppSelector } from "../../redux/hooks";
import HeaderCategory from "./HeaderCategory";

export default function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const env = import.meta.env;
  const search = useAppSelector((state: RootState) => state.search.name);

  const componentsArr: ReactNode[] = [];
  for (let i = 0; i <= 6; i++) {
    componentsArr.push(<ProductsSkelton key={i} />);
  }

  const handleAddToCart = (event: MouseEvent, product: IProduct) => {
    event.stopPropagation();
    const getToken = localStorage.getItem("token");

    if (!getToken) {
      const cartString: string | null = localStorage.getItem("cart");
      const cart: IProduct[] = cartString ? JSON.parse(cartString) : [];
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      console.log("Cart: ");
    }
  };

  const handleViewChart = (event: MouseEvent) => {
    event.stopPropagation();
  };
  const handelNavAndRedux = (productId: string) => {
    productId && navigate(`/product/${productId}`);
  };
  const getProducts = async (search: string = "") => {
    try {
      const productsResult = await axios.get(`${env.VITE_BASE_URL}/products/all/${search}`);
      setProducts(productsResult.data);
      console.log(productsResult);
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
          <HeaderCategory />
          {Array.isArray(products) &&
            products.map((product) => (
              <CardActionArea
                sx={{ maxWidth: 345, flex: "1 1 300px", margin: "1rem" }}
                key={product._id}
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
                        <Typography color="textSecondary" ml={1} sx={{ margin: "1rem", textDecoration: "line-through" }}>
                          ${product.salePrice}
                        </Typography>
                      )}
                      {product.discountPercentage && <Typography variant="h6"> $ {(product.salePrice - product.salePrice * (product.discountPercentage / 100)).toFixed(2)}</Typography>}
                    </Stack>
                  </Stack>
                </CardContent>
                <CardActions>
                  <Tooltip title="Add To Cart">
                    <IconButton
                      onClick={(event: MouseEvent<HTMLButtonElement>) => handleAddToCart(event, product)}
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
                      onClick={(event: MouseEvent<HTMLButtonElement>) => handleViewChart(event)}
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
